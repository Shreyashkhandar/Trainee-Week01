'use client';

import { useState, type FormEvent } from 'react';
import type { Complaint, ComplaintInput, ComplaintPriority, ComplaintStatus, ComplaintType, Facility } from '@/types/domain';

const priorities: ComplaintPriority[] = ['Low', 'Medium', 'High', 'Critical'];
const statuses: ComplaintStatus[] = ['Open', 'In Progress', 'Resolved'];
const types: ComplaintType[] = ['Cleanliness', 'Safety', 'Maintenance', 'Supplies', 'Other'];

interface ComplaintFormProps {
  facilities: Facility[];
  initial?: Complaint | null;
  saving: boolean;
  onSave: (input: ComplaintInput) => Promise<void>;
  onCancel: () => void;
}

export function ComplaintForm({ facilities, initial, saving, onSave, onCancel }: ComplaintFormProps) {
  const initialForm = {
    facilityId: initial?.facilityId ?? facilities[0]?.id ?? 0,
    title: initial?.title ?? '',
    description: initial?.description ?? '',
    complaintType: initial?.complaintType ?? 'Other',
    priority: initial?.priority ?? 'Medium',
    status: initial?.status ?? 'Open',
    reportedBy: initial?.reportedBy ?? ''
  };
  const [form, setForm] = useState(initialForm);

  function update<K extends keyof typeof initialForm>(field: K, value: (typeof initialForm)[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.facilityId || !form.title.trim() || !form.description.trim() || !form.reportedBy.trim()) {
      window.alert('Please complete the facility, title, description, and reported by fields.');
      return;
    }
    await onSave({
      facilityId: Number(form.facilityId),
      title: form.title.trim(),
      description: form.description.trim(),
      complaintType: form.complaintType,
      priority: form.priority,
      status: form.status,
      reportedBy: form.reportedBy.trim()
    });
  }

  return (
    <form className="panel form-panel" onSubmit={(event) => void submit(event)}>
      <div className="page-heading"><div><p className="eyebrow">Complaint record</p><h2>{initial ? 'Edit complaint' : 'Add complaint'}</h2></div></div>
      <div className="form-grid">
        <div className="field"><label htmlFor="complaint-facility">Facility</label><select id="complaint-facility" value={form.facilityId} onChange={(event) => update('facilityId', Number(event.target.value))}>{facilities.map((facility) => <option key={facility.id} value={facility.id}>{facility.name}</option>)}</select></div>
        <div className="field"><label htmlFor="complaint-title">Title</label><input id="complaint-title" maxLength={160} required value={form.title} onChange={(event) => update('title', event.target.value)} /></div>
        <div className="field"><label htmlFor="complaint-type">Complaint type</label><select id="complaint-type" value={form.complaintType} onChange={(event) => update('complaintType', event.target.value as ComplaintType)}>{types.map((type) => <option key={type}>{type}</option>)}</select></div>
        <div className="field"><label htmlFor="complaint-priority">Priority</label><select id="complaint-priority" value={form.priority} onChange={(event) => update('priority', event.target.value as ComplaintPriority)}>{priorities.map((priority) => <option key={priority}>{priority}</option>)}</select></div>
        <div className="field"><label htmlFor="complaint-status">Status</label><select id="complaint-status" value={form.status} onChange={(event) => update('status', event.target.value as ComplaintStatus)}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></div>
        <div className="field"><label htmlFor="complaint-reported-by">Reported by</label><input id="complaint-reported-by" maxLength={120} required value={form.reportedBy} onChange={(event) => update('reportedBy', event.target.value)} /></div>
        <div className="field field--grow"><label htmlFor="complaint-description">Description</label><textarea id="complaint-description" required value={form.description} onChange={(event) => update('description', event.target.value)} /></div>
      </div>
      <div className="form-actions"><button className="button button--light" onClick={onCancel} type="button">Cancel</button><button className="button" disabled={saving} type="submit">{saving ? 'Saving…' : initial ? 'Save changes' : 'Create complaint'}</button></div>
    </form>
  );
}
