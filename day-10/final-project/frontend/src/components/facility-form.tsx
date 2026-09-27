'use client';

import { useState, type FormEvent } from 'react';
import type { Facility, FacilityInput, FacilityStatus, FacilityType } from '@/types/domain';

const types: FacilityType[] = ['Clinic', 'Warehouse', 'Training Center', 'Laboratory', 'Office', 'Community Center'];
const statuses: FacilityStatus[] = ['Active', 'Under Maintenance', 'Inactive'];

interface FacilityFormProps {
  initial?: Facility | null;
  saving: boolean;
  onSave: (input: FacilityInput) => Promise<void>;
  onCancel: () => void;
}

export function FacilityForm({ initial, saving, onSave, onCancel }: FacilityFormProps) {
  const initialForm = {
    name: initial?.name ?? '',
    facilityCode: initial?.facilityCode ?? '',
    location: initial?.location ?? '',
    facilityType: initial?.facilityType ?? 'Clinic' as FacilityType,
    status: initial?.status ?? 'Active' as FacilityStatus,
    cleanlinessScore: initial?.cleanlinessScore.toString() ?? '0'
  };
  const [form, setForm] = useState(initialForm);

  function update<K extends keyof typeof initialForm>(field: K, value: (typeof initialForm)[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSave({ ...form, cleanlinessScore: Number(form.cleanlinessScore) });
  }

  return (
    <form className="panel form-panel" onSubmit={(event) => void submit(event)}>
      <div className="page-heading"><div><p className="eyebrow">Facility record</p><h2>{initial ? 'Edit facility' : 'Add facility'}</h2></div></div>
      <div className="form-grid">
        <div className="field"><label htmlFor="facility-name">Facility name</label><input id="facility-name" maxLength={140} required value={form.name} onChange={(event) => update('name', event.target.value)} /></div>
        <div className="field"><label htmlFor="facility-code">Facility code</label><input id="facility-code" maxLength={24} required value={form.facilityCode} onChange={(event) => update('facilityCode', event.target.value)} /></div>
        <div className="field"><label htmlFor="facility-location">Location</label><input id="facility-location" maxLength={180} required value={form.location} onChange={(event) => update('location', event.target.value)} /></div>
        <div className="field"><label htmlFor="facility-type">Type</label><select id="facility-type" value={form.facilityType} onChange={(event) => update('facilityType', event.target.value as FacilityType)}>{types.map((type) => <option key={type}>{type}</option>)}</select></div>
        <div className="field"><label htmlFor="facility-status">Status</label><select id="facility-status" value={form.status} onChange={(event) => update('status', event.target.value as FacilityStatus)}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></div>
        <div className="field"><label htmlFor="facility-score">Cleanliness score (0-100)</label><input id="facility-score" max="100" min="0" required type="number" value={form.cleanlinessScore} onChange={(event) => update('cleanlinessScore', event.target.value)} /></div>
      </div>
      <div className="form-actions"><button className="button button--light" onClick={onCancel} type="button">Cancel</button><button className="button" disabled={saving} type="submit">{saving ? 'Saving…' : initial ? 'Save changes' : 'Create facility'}</button></div>
    </form>
  );
}

import React from 'react';