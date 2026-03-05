<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-box">
      <div class="modal-header">
        <h3>{{ contract ? '✏️ Edit Contract' : '➕ New Contract' }}</h3>
        <button class="modal-close" @click="$emit('close')">×</button>
      </div>
      <div class="modal-body">
        <div class="form-grid">

          <div class="form-section-title">Personal Information</div>
          <div class="form-field">
            <label class="req">Last Name *</label>
            <input v-model="form.last_name" class="red-border" placeholder="e.g. CRISPO" />
          </div>
          <div class="form-field">
            <label class="req">First Name *</label>
            <input v-model="form.first_name" class="red-border" placeholder="e.g. JAMES" />
          </div>
          <div class="form-field">
            <label>Middle Initial</label>
            <input v-model="form.middle_initial" placeholder="e.g. B." />
          </div>
          <div class="form-field">
            <label>Civil Status</label>
            <select v-model="form.civil_status">
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>
          <div class="form-field full">
            <label class="req">Residential Address</label>
            <input v-model="form.address" placeholder="e.g. Brgy. Tiniwisan, Butuan City" />
          </div>

          <div class="form-section-title">Position Details</div>
          <div class="form-field">
            <label class="req">Position / Title</label>
            <input v-model="form.position_title" placeholder="e.g. Utility Worker" />
          </div>
          <div class="form-field">
            <label>Job Title (for TOR)</label>
            <input v-model="form.job_title" placeholder="e.g. SKILLED WORKER" />
          </div>
          <div class="form-field">
            <label>Official Station</label>
            <input v-model="form.official_station" placeholder="e.g. GENERAL SERVICES OFFICE" />
          </div>
          <div class="form-field">
            <label>Department</label>
            <input v-model="form.department" placeholder="e.g. GSO" />
          </div>

          <div class="form-section-title">Contract Terms</div>
          <div class="form-field">
            <label class="req">Start Date</label>
            <input type="date" v-model="form.start_date" />
          </div>
          <div class="form-field">
            <label class="req">End Date</label>
            <input type="date" v-model="form.end_date" />
          </div>
          <div class="form-field">
            <label class="req">Daily Rate (₱)</label>
            <input type="number" v-model="form.daily_rate" placeholder="700" />
          </div>
          <div class="form-field">
            <label>Rate in Words</label>
            <input v-model="form.rate_in_words" placeholder="Seven Hundred Pesos Only" />
          </div>
          <div class="form-field">
            <label>Fund Source</label>
            <input v-model="form.fund_source" placeholder="e.g. IGF-CWF/RAF-GASS" />
          </div>
          <div class="form-field">
            <label>Status</label>
            <select v-model="form.status">
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="terminated">Terminated</option>
            </select>
          </div>

          <div class="form-section-title">✍️ Signatories</div>
          <div class="form-field">
            <label>Noted By (Name)</label>
            <input v-model="form.noted_by_name" />
          </div>
          <div class="form-field">
            <label>Noted By (Position)</label>
            <input v-model="form.noted_by_position" />
          </div>
          <div class="form-field">
            <label>Place of Notary</label>
            <input v-model="form.place_of_notary" />
          </div>

          <div class="form-section-title">Functions &amp; Responsibilities</div>
          <div class="form-field full">
            <label>Functions (one per line)</label>
            <textarea v-model="form.functions" rows="5"
              placeholder="Performs assigned construction, renovation, repair, and maintenance tasks.&#10;Reads and interprets simple drawings and work orders.&#10;Ensures work quality meets established standards."></textarea>
          </div>

        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" @click="$emit('close')">Cancel</button>
        <button class="btn btn-green" :disabled="saving" @click="submit">
          {{ saving ? '⏳ Saving...' : (contract ? '✅ Update Contract' : '✅ Create Contract') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { createContract, updateContract } from '../firebase.js'

const props = defineProps({ contract: { type: Object, default: null } })
const emit = defineEmits(['close', 'saved'])

const blank = {
  last_name: '', first_name: '', middle_initial: '',
  civil_status: 'single', address: '',
  position_title: '', job_title: '', official_station: '', department: '',
  start_date: new Date().getFullYear() + '-01-01',
  end_date:   new Date().getFullYear() + '-03-31',
  daily_rate: 700, rate_in_words: 'Seven Hundred Pesos Only',
  fund_source: 'IGF-CWF/RAF-GASS',
  noted_by_name: 'ENGR. MARIEL M. DELO',
  noted_by_position: 'Director, GSO',
  place_of_notary: 'CITY OF BUTUAN',
  functions: `Performs assigned construction, renovation, repair, and maintenance tasks according to plans, specifications, and instructions from the Leadman or Foreman.
Reads and interprets simple drawings, sketches, and work orders relevant to the assigned trade.
Prepares, measures, cuts, and installs materials accurately using proper tools and techniques.
Ensures work quality meets established standards and adheres to project specifications.
Assists in the dismantling, repair, or installation of facility components such as doors, windows, partitions, plumbing lines, fixtures, and electrical devices.
Coordinates with other trades to ensure smooth and efficient workflow on site.
Observes and complies with all workplace safety rules and regulations.
Uses appropriate personal protective equipment (PPE) at all times.
Maintains cleanliness and orderliness of tools, equipment, and work areas.
Reports unsafe conditions, damaged tools, or near-miss incidents to the Leadman or Foreman.
Ensures tools and equipment are properly used, maintained, and returned after work.
Assists in checking and safeguarding materials and supplies delivered to the job site.
Avoids wastage of materials through proper handling and accurate measurement.`, status: 'draft'
}

const form = ref({ ...blank })
const saving = ref(false)

watch(() => props.contract, (c) => {
  if (c) {
    form.value = {
      ...blank, ...c,
      start_date: (c.start_date || '').slice(0, 10),
      end_date:   (c.end_date   || '').slice(0, 10)
    }
  } else {
    form.value = { ...blank }
  }
}, { immediate: true })

async function submit() {
  if (!form.value.last_name.trim() || !form.value.first_name.trim()) {
    alert('Please enter Last Name and First Name.')
    return
  }
  saving.value = true
  try {
    const data = {
      ...form.value,
      last_name:      form.value.last_name.trim().toUpperCase(),
      first_name:     form.value.first_name.trim().toUpperCase(),
      middle_initial: (form.value.middle_initial || '').trim().toUpperCase(),
      daily_rate:     Number(form.value.daily_rate) || 0
    }
    if (props.contract) {
      await updateContract(props.contract.id, data)
      emit('saved', 'Contract updated: ' + data.last_name + ', ' + data.first_name)
    } else {
      const created = await createContract(data)
      emit('saved', 'Contract created: ' + created.contract_no + ' — ' + data.last_name + ', ' + data.first_name)
    }
  } catch (e) {
    alert('Firebase error: ' + e.message)
  } finally {
    saving.value = false
  }
}
</script>
