'use client';

import { useState, type FormEvent } from 'react';
import type { Facility, Inspection, InspectionInput, InspectionStatus, WasteLevel } from '@/types/domain';

const statuses: InspectionStatus[] = ['Pending', 'Completed', 'Needs Follow-up'];
const wasteLevels: WasteLevel[] = ['Low', 'Moderate', 'High'];

interface InspectionFormProps {
  facilities: Facility[];
  initial?: Inspection | null;
  saving: boolean;
  onSave: (input: InspectionInput) => Promise<void>;
  onCancel: () => void;
}

const emptyForm = {
  facilityId: 0,
  inspectorName: '',
  inspectionDate: '',
  cleanlinessScore: '0',
  odorScore: '0',
  wasteLevel: 'Low' as WasteLevel,
  waterAvailability: true,
  remarks: '',
  status: 'Pending' as InspectionStatus
};

export function InspectionForm({ facilities, initial, saving, onSave, onCancel }: InspectionFormProps) {
  const initialForm = {
    facilityId: initial?.facilityId ?? facilities[0]?.id ?? 0,
    inspectorName: initial?.inspectorName ?? '',
    inspectionDate: initial?.inspectionDate ?? new Date().toISOString().slice(0, 10),
    cleanlinessScore: initial?.cleanlinessScore.toString() ?? '0',
    odorScore: initial?.odorScore.toString() ?? '0',
    wasteLevel: initial?.wasteLevel ?? 'Low',
    waterAvailability: initial?.waterAvailability ?? true,
    remarks: initial?.remarks ?? '',
    status: initial?.status ?? 'Pending'
  };
  const [form, setForm] = useState(initialForm);

  function update<K extends keyof typeof initialForm>(field: K, value: (typeof initialForm)[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const facilityId = Number(form.facilityId);
    if (!facilityId || !form.inspectorName.trim() || !form.inspectionDate || !form.remarks.trim()) {
      window.alert('Please provide a facility, inspector, inspection date, and remarks.');
      return;
    }
    const cleanlinessScore = Number(form.cleanlinessScore);
    const odorScore = Number(form.odorScore);
    if (Number.isNaN(cleanlinessScore) || cleanlinessScore < 0 || cleanlinessScore > 100) {
      window.alert('Cleanliness score must be between 0 and 100.');
      return;
    }
    if (Number.isNaN(odorScore) || odorScore < 0 || odorScore > 100) {
      window.alert('Odor score must be between 0 and 100.');
      return;
    }
    await onSave({
      facilityId,
      inspectorName: form.inspectorName.trim(),
      inspectionDate: form.inspectionDate,
      cleanlinessScore,
      odorScore,
      wasteLevel: form.wasteLevel,
      waterAvailability: form.waterAvailability,
      remarks: form.remarks.trim(),
      status: form.status
    });
  }

  return (
    <form className="panel form-panel" onSubmit={(event) => void submit(event)}>
      <div className="page-heading"><div><p className="eyebrow">Inspection record</p><h2>{initial ? 'Edit inspection' : 'Add inspection'}</h2></div></div>
      <div className="form-grid">
        <div className="field"><label htmlFor="inspection-facility">Facility</label>
          <select id="inspection-facility" value={form.facilityId} onChange={(event) => update('facilityId', Number(event.target.value))}>
            {facilities.map((facility) => <option key={facility.id} value={facility.id}>{facility.name}</option>)}
          </select>
        </div>
        <div className="field"><label htmlFor="inspection-inspector">Inspector</label><input id="inspection-inspector" maxLength={120} required value={form.inspectorName} onChange={(event) => update('inspectorName', event.target.value)} /></div>
        <div className="field"><label htmlFor="inspection-date">Inspection date</label><input id="inspection-date" required type="date" value={form.inspectionDate} onChange={(event) => update('inspectionDate', event.target.value)} /></div>
        <div className="field"><label htmlFor="inspection-status">Status</label><select id="inspection-status" value={form.status} onChange={(event) => update('status', event.target.value as InspectionStatus)}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></div>
        <div className="field"><label htmlFor="inspection-cleanliness">Cleanliness score</label><input id="inspection-cleanliness" max={100} min={0} required type="number" value={form.cleanlinessScore} onChange={(event) => update('cleanlinessScore', event.target.value)} /></div>
        <div className="field"><label htmlFor="inspection-odor">Odor score</label><input id="inspection-odor" max={100} min={0} required type="number" value={form.odorScore} onChange={(event) => update('odorScore', event.target.value)} /></div>
        <div className="field"><label htmlFor="inspection-waste">Waste level</label><select id="inspection-waste" value={form.wasteLevel} onChange={(event) => update('wasteLevel', event.target.value as WasteLevel)}>{wasteLevels.map((level) => <option key={level}>{level}</option>)}</select></div>
        <div className="field"><label htmlFor="inspection-water">Water available</label><select id="inspection-water" value={String(form.waterAvailability)} onChange={(event) => update('waterAvailability', event.target.value === 'true')}><option value="true">Yes</option><option value="false">No</option></select></div>
        <div className="field field--grow"><label htmlFor="inspection-remarks">Remarks</label><textarea id="inspection-remarks" required value={form.remarks} onChange={(event) => update('remarks', event.target.value)} /></div>
      </div>
      <div className="form-actions"><button className="button button--light" onClick={onCancel} type="button">Cancel</button><button className="button" disabled={saving} type="submit">{saving ? 'Saving…' : initial ? 'Save changes' : 'Create inspection'}</button></div>
    </form>
  );
}
