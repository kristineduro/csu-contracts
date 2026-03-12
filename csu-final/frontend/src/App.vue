<template>
  <div class="app-wrapper">

    <!-- ══ SIDEBAR ══ -->
    <aside class="sidebar">
      <div class="sidebar-brand">
        <div class="sidebar-logo-wrap">
          <img src="/logo.png" alt="CSU Logo" class="sidebar-logo">
        </div>
        <div class="sidebar-brand-text">
          <h2>GSO Contract<br>Management</h2>
          <small>Caraga State University</small>
        </div>
      </div>
      <nav>
        <a :class="{ active: tab === 'dashboard' }" @click="goTab('dashboard')">
          <span class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></span> Dashboard
        </a>
        <a :class="{ active: tab === 'contracts' }" @click="goTab('contracts')">
          <span class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><rect x="9" y="2" width="6" height="4" rx="1"/><path d="M9 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-3"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="12" y2="18"/></svg></span> All Contracts
        </a>
        <a @click="openCreate">
          <span class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg></span> New Contract
        </a>
        <a :class="{ active: tab === 'saved' }" @click="goTab('saved')">
          <span class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg></span> Saved Files
        </a>
        <a v-if="viewingContract" :class="{ active: tab === 'view' }" @click="tab = 'view'">
          <span class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></span> Preview
        </a>
      </nav>
      <div class="fb-status">
        <span>{{ fbOk ? '●' : '●' }}</span>
        <span :style="{ color: fbOk ? '#a5d6a7' : '#ef9a9a' }">
          {{ fbOk ? 'Firebase Connected' : 'Not Connected' }}
        </span>
      </div>
    </aside>

    <!-- ══ MAIN ══ -->
    <div class="main">

      <div class="content">

        <!-- Firebase warning -->
        <div v-if="!fbOk" class="fb-warning">
          <b>Firebase not configured.</b>
          Open <code>src/firebase.js</code> and paste your Firebase project config.
          <a href="https://console.firebase.google.com" target="_blank">→ Open Firebase Console</a>
        </div>

        <!-- ══════ DASHBOARD ══════ -->
        <div v-if="tab === 'dashboard'">
          <div class="dashboard-hero">
          <div class="dashboard-clock">
            <div class="clock-date">{{ clockDate }}</div>
            <div class="clock-time">{{ clockTime }}</div>
          </div>
        </div>
          <div class="dashboard-content">
          <div v-if="loading" class="loading">
            <div class="spinner"></div><p>Loading...</p>
          </div>
          <template v-else>
            <div class="stats-grid">
              <div class="stat-card stat-total" @click="goTab('contracts')">
                <div class="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="36" height="36"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                </div>
                <div><h2>{{ stats.total || 0 }}</h2><p>Total</p></div>
              </div>
              <div class="stat-card stat-active" @click="goTab('contracts')">
                <div class="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="36" height="36"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div><h2>{{ stats.active || 0 }}</h2><p>Active</p></div>
              </div>
              <div class="stat-card stat-draft" @click="goTab('contracts')">
                <div class="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="36" height="36"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                </div>
                <div><h2>{{ stats.draft || 0 }}</h2><p>Draft</p></div>
              </div>
              <div class="stat-card stat-expired" @click="goTab('contracts')">
                <div class="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="36" height="36"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div><h2>{{ stats.expired || 0 }}</h2><p>Expired</p></div>
              </div>
            </div>
            <div class="card">
              <div class="card-header">
                <h3>Recent Contracts</h3>
                <button class="btn btn-outline btn-sm" @click="goTab('contracts')">View All</button>
              </div>
              <div class="card-body" style="padding:0">
                <div class="table-wrap">
                  <table class="data-table">
                    <thead>
                      <tr>
                        <th>Last Name</th><th>First Name</th>
                        <th>MI</th><th>Start</th><th>End</th><th>Status</th><th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="!recent.length">
                        <td colspan="7">
                          <div class="empty-state">
                            <div class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="40" height="40"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div><p>No contracts yet.</p>
                          </div>
                        </td>
                      </tr>
                      <tr v-for="c in recent" :key="c.id">
                        <td>{{ c.last_name }}</td>
                        <td>{{ c.first_name }}</td>
                        <td>{{ c.middle_initial }}</td>
                        <td>{{ c.start_date }}</td>
                        <td>{{ c.end_date }}</td>
                        <td><span :class="'badge badge-' + c.status">{{ c.status }}</span></td>
                        <td>
                          <button class="btn btn-outline btn-sm" @click="viewC(c)">View</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </template>
          </div><!-- /dashboard-content -->
        </div>

        <!-- ══════ ALL CONTRACTS ══════ -->
        <div v-else-if="tab === 'contracts'" style="padding:24px">
          <div class="page-top-bar">
            <button class="btn btn-new-contract" @click="openCreate">+ New Contract</button>
          </div>
          <div class="card">
            <div class="card-header">
              <h3>All Contracts</h3>
              <div style="display:flex;gap:8px">
                <input
                  class="search-input"
                  v-model="search"
                  @input="doSearch"
                  placeholder="Search name or contract no..."
                >
                <select
                  class="search-input"
                  style="min-width:130px"
                  v-model="filterStatus"
                  @change="doSearch"
                >
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="expired">Expired</option>
                  <option value="terminated">Terminated</option>
                </select>
              </div>
            </div>
            <div class="card-body" style="padding:0">
              <div v-if="loading" class="loading"><div class="spinner"></div></div>
              <div class="table-wrap" v-else>
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Last Name</th><th>First Name</th><th>MI</th>
                      <th>Position</th><th>Start</th><th>End</th><th>Daily Rate</th>
                      <th>Status</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="!contracts.length">
                      <td colspan="9">
                        <div class="empty-state">
                          <div class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="40" height="40"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>
                          <p>No contracts found.</p>
                          <button class="btn btn-green" @click="openCreate">Create First Contract</button>
                        </div>
                      </td>
                    </tr>
                    <tr v-for="c in contracts" :key="c.id">
                      <td>{{ c.last_name }}</td>
                      <td>{{ c.first_name }}</td>
                      <td>{{ c.middle_initial }}</td>
                      <td>{{ c.position_title || '—' }}</td>
                      <td>{{ c.start_date }}</td>
                      <td>{{ c.end_date }}</td>
                      <td>₱{{ fmtN(c.daily_rate) }}</td>
                      <td><span :class="'badge badge-' + c.status">{{ c.status }}</span></td>
                      <td>
                        <div class="actions">
                          <button class="btn btn-outline btn-sm" @click="viewC(c)" title="View">View</button>
                          <button class="btn btn-gold btn-sm" @click="openEdit(c)" title="Edit">Edit</button>
                          <button class="btn btn-red btn-sm" @click="delC(c)" title="Delete">Del</button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- ══════ SAVED FILES ══════ -->
        <div v-else-if="tab === 'saved'" style="padding:24px">
          <div class="page-top-bar">
            <button class="btn btn-new-contract" @click="openCreate">+ New Contract</button>
          </div>
          <div v-if="loadingSaved" class="loading"><div class="spinner"></div><p>Loading...</p></div>
          <template v-else>

            <!-- Folder grid -->
            <div v-if="!openFolder">
              <div class="card">
                <div class="card-header">
                  <h3>Saved Files — Contract Folders</h3>
                </div>
                <div class="card-body">
                  <div v-if="!allContracts.length" class="empty-state">
                    <div class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="40" height="40"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg></div>
                    <p>No contracts yet. Create a contract first.</p>
                  </div>
                  <div v-else class="folder-grid">
                    <div
                      v-for="c in allContracts"
                      :key="c.id"
                      class="folder-card"
                      @click="openFolderFor(c)"
                    >
                      <div class="folder-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#003300" stroke-width="2" width="36" height="36"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg></div>
                      <div class="folder-no"></div>
                      <div class="folder-ln">{{ c.last_name }}</div>
                      <div class="folder-fn">{{ c.first_name }} {{ c.middle_initial }}</div>
                      <span
                        :class="'badge badge-' + c.status"
                        style="margin-top:5px;display:inline-block"
                      >{{ c.status }}</span>
                      <div class="folder-count">{{ folderCounts[c.id] || 0 }} file(s)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Inside a folder -->
            <div v-else>
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;flex-wrap:wrap">
                <button class="btn btn-outline" @click="openFolder = null">← All Folders</button>
                <div>
                  <span style="font-weight:700">
                    {{ openFolder.last_name }}, {{ openFolder.first_name }} {{ openFolder.middle_initial }}
                  </span>
                </div>
                <button
                  class="btn btn-green btn-sm"
                  style="margin-left:auto"
                  @click="viewC(openFolder)"
                >Open Contract</button>
              </div>

              <div class="card">
                <div class="card-header">
                  <h3>Files — {{ openFolder.last_name }}, {{ openFolder.first_name }}</h3>
                  <span style="font-size:.77rem;opacity:.85">{{ folderFiles.length }} file(s)</span>
                </div>
                <div class="card-body">
                  <div v-if="loadingFiles" class="loading"><div class="spinner"></div></div>
                  <div v-else-if="!folderFiles.length" class="empty-state">
                    <div class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="40" height="40"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>
                    <p>No saved files yet for this contract.</p>
                    <button class="btn btn-green" @click="viewC(openFolder)">
                      Open Contract → Click Save File button above
                    </button>
                  </div>
                  <div v-else class="file-list">
                    <div v-for="f in folderFiles" :key="f.id" class="file-card">
                      <div class="file-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#003300" stroke-width="2" width="28" height="28"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>
                      <div class="file-info">
                        <div class="file-name">{{ f.name }}</div>
                        <div class="file-date">Saved: {{ f.saved_at_display }}</div>
                      </div>
                      <div class="file-actions">
                        <button class="btn btn-green btn-sm" @click="downloadFile(f)">Download</button>
                        <button class="btn btn-red btn-sm" @click="deleteFile(f, openFolder.id)">Del</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </template>
        </div>

        <!-- ══════ CONTRACT VIEW ══════ -->
        <div v-else-if="tab === 'view' && viewingContract" style="padding:24px">

          <!-- Gold save bar at top -->
          <div class="save-bar no-print">
            <div class="save-bar-info">
              <span class="save-bar-name">
                {{ viewingContract.last_name }}, {{ viewingContract.first_name }} {{ viewingContract.middle_initial }}
              </span>
              <span class="save-bar-hint">Click any text on the contract to edit it</span>
            </div>
            <div class="save-bar-actions">
              <button class="btn btn-outline btn-sm" @click="openEdit(viewingContract)">Edit Details</button>
              <button class="btn btn-gold" @click="saveFile">
                Save as PDF
                <span class="save-filename">
                  {{ viewingContract.last_name }}_{{ viewingContract.first_name }}.pdf
                </span>
              </button>
              <button class="btn btn-green" @click="printContract">Print</button>
            </div>
          </div>

          <div class="view-layout">
            <!-- Contract pages -->
            <div class="view-main">
              <div class="contract-scaler" ref="scalerRef" style="overflow:hidden">
                <ContractView
                  v-if="tab === 'view' && viewingContract"
                  :c="viewingContract"
                  :header-img="headerImg"
                  :bagong-img="bagongImg"
                />
              </div>
            </div>

            <!-- Right sidebar -->
            <div class="view-sidebar no-print">

              <!-- Contract info -->
              <div class="card">
                <div class="card-body" style="font-size:.84rem;line-height:2.2">
                  <div><b>Last Name:</b> <b style="color:var(--black)">{{ viewingContract.last_name }}</b></div>
                  <div><b>First Name:</b> <b style="color:var(--black)">{{ viewingContract.first_name }}</b></div>
                  <div><b>Status:</b> <span :class="'badge badge-' + viewingContract.status">{{ viewingContract.status }}</span></div>
                  <div><b>Period:</b> {{ viewingContract.start_date }} – {{ viewingContract.end_date }}</div>
                  <div><b>Rate:</b> ₱{{ fmtN(viewingContract.daily_rate) }}/day</div>
                  <div><b>Station:</b> {{ viewingContract.official_station }}</div>
                </div>
              </div>

              <!-- How to save -->
              <div class="card">
                <div class="card-header"><h3>Saving Files</h3></div>
                <div class="card-body" style="font-size:.82rem;line-height:1.85">
                  <div style="background:#fffde7;border:1.5px solid var(--gold);border-radius:6px;padding:10px;margin-bottom:10px">
                    <b>Click the gold Save as PDF button above ↑</b><br><br>
                    In the print dialog:<br>
                    1. Set <b>Destination → Save as PDF</b><br>
                    2. Set paper to <b>Folio / 8.5×13"</b><br>
                    3. Click <b>Save</b><br><br>
                    File name:<br>
                    <code style="font-size:.72rem;background:#f5f5f5;padding:2px 6px;border-radius:3px;display:block;margin-top:4px;word-break:break-all">
                      {{ viewingContract.last_name }}_{{ viewingContract.first_name }}.pdf
                    </code>
                  </div>
                  <p>See all saved files in the <b>Saved Files</b> sidebar tab</p>
                </div>
              </div>

              <!-- Recent saves -->
              <div class="card">
                <div class="card-header">
                  <h3>Recent Saves</h3>
                  <button class="btn btn-outline btn-sm" @click="goToSavedFolder">All</button>
                </div>
                <div class="card-body" style="padding:8px">
                  <div v-if="loadingRecentSaves" class="loading" style="padding:12px">
                    <div class="spinner" style="width:18px;height:18px;border-width:2px"></div>
                  </div>
                  <div
                    v-else-if="!recentSaves.length"
                    style="text-align:center;color:#999;font-size:.78rem;padding:12px"
                  >
                    No saved files yet.<br>Click Save File to create one.
                  </div>
                  <div v-for="f in recentSaves" :key="f.id" class="mini-file">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2" width="24" height="24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    <div style="flex:1;min-width:0">
                      <div class="mini-file-name">{{ f.name }}</div>
                      <div class="mini-file-date">{{ f.saved_at_display }}</div>
                    </div>
                    <button class="btn btn-outline btn-sm" @click="downloadFile(f)" title="Download">DL</button>
                    <button class="btn btn-red btn-sm" @click="deleteFile(f, viewingContract.id)" title="Delete">Del</button>
                  </div>
                </div>
              </div>

              <!-- Other actions -->
              <div class="card">
                <div class="card-header"><h3>Actions</h3></div>
                <div class="card-body" style="display:flex;flex-direction:column;gap:8px">
                  <button class="btn btn-outline" @click="goToSavedFolder">View All Saved Files</button>
                  <button class="btn btn-red" @click="delC(viewingContract)">Delete Contract</button>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div><!-- /content -->
    </div><!-- /main -->

    <!-- Form modal -->
    <ContractForm
      v-if="showForm"
      :contract="editingContract"
      @close="showForm = false"
      @saved="onSaved"
    />

    <!-- Toast notification -->
    <div v-if="toastMsg" :class="['toast', 'toast-' + toastType]">{{ toastMsg }}</div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import ContractForm from './components/ContractForm.vue'
import ContractView from './components/ContractView.vue'
import {
  getAllContracts,
  getStats,
  deleteContract as fbDelete,
  getSavedFiles,
  addSavedFile,
  deleteSavedFile
} from './firebase.js'

// ── STATE ──────────────────────────────────────────────────────
const tab              = ref('dashboard')
const stats            = ref({ total:0, active:0, draft:0, expired:0, terminated:0 })
const contracts        = ref([])
const allContracts     = ref([])
const recent           = ref([])
const viewingContract  = ref(null)
const showForm         = ref(false)
const editingContract  = ref(null)
const search           = ref('')
const filterStatus     = ref('')
const loading          = ref(false)
const loadingSaved     = ref(false)
const loadingFiles     = ref(false)
const loadingRecentSaves = ref(false)
const fbOk             = ref(false)
const headerImg        = ref('')
const bagongImg        = ref('')
const toastMsg         = ref('')
const toastType        = ref('success')
const openFolder       = ref(null)
const folderFiles      = ref([])
const folderCounts     = ref({})
const recentSaves      = ref([])
const scalerRef        = ref(null)
const clockDate        = ref('')
const clockTime        = ref('')

function updateClock() {
  const now = new Date()
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
  const day = days[now.getDay()]
  const month = months[now.getMonth()]
  const date = now.getDate()
  const year = now.getFullYear()
  let h = now.getHours()
  const m = String(now.getMinutes()).padStart(2, '0')
  const s = String(now.getSeconds()).padStart(2, '0')
  const ampm = h >= 12 ? 'PM' : 'AM'
  h = h % 12 || 12
  clockDate.value = `${day}, ${month} ${date}, ${year}`
  clockTime.value = `${h}:${m}:${s} ${ampm}`
}

function scaleContract() {
  nextTick(() => {
    const el = scalerRef.value
    if (!el) return
    const parent = el.parentElement
    if (!parent) return
    const available = parent.clientWidth - 10
    const scale = Math.min(1, available / 816)
    el.style.transform = `scale(${scale})`
    el.style.transformOrigin = 'top left'
    el.style.width = '816px'
    el.style.display = 'block'
    const pages = el.querySelectorAll ? el.querySelectorAll('.bond-page').length : 5
    const totalH = pages * 1248 + (pages - 1) * 14
    parent.style.minHeight = Math.round(totalH * scale) + 'px'
    // Store scale so we never apply it to print
    el.dataset.previewScale = scale
  })
}

// ── COMPUTED ───────────────────────────────────────────────────
const pageTitle = computed(() => {
  if (tab.value === 'dashboard') return 'Dashboard'
  if (tab.value === 'contracts') return 'All Contracts'
  if (tab.value === 'saved') {
    return openFolder.value
      ? openFolder.value.last_name + ', ' + openFolder.value.first_name
      : 'Saved Files'
  }
  if (tab.value === 'view' && viewingContract.value) {
    return viewingContract.value.last_name + ', ' + viewingContract.value.first_name
  }
  return 'CSU Contract Management'
})

// ── LIFECYCLE ──────────────────────────────────────────────────
onMounted(async () => {
  await loadImages()
  await loadDashboard()
  updateClock()
  setInterval(updateClock, 1000)
})

async function loadImages() {
  try {
    const [r1, r2] = await Promise.all([fetch('/header.png'), fetch('/bagong.png')])
    const [b1, b2] = await Promise.all([r1.blob(), r2.blob()])
    headerImg.value = await blobToB64(b1)
    bagongImg.value = await blobToB64(b2)
  } catch (e) {
    console.warn('Header images not loaded:', e.message)
  }
}

function blobToB64(blob) {
  return new Promise(resolve => {
    const fr = new FileReader()
    fr.onload = () => resolve(fr.result)
    fr.readAsDataURL(blob)
  })
}

// ── DATA LOADING ───────────────────────────────────────────────
async function loadDashboard() {
  loading.value = true
  try {
    const [s, list] = await Promise.all([getStats(), getAllContracts()])
    stats.value       = s
    allContracts.value = list
    recent.value      = list.slice(0, 8)
    fbOk.value        = true
  } catch (e) {
    fbOk.value = false
    console.error('Firebase error:', e.message)
  } finally {
    loading.value = false
  }
}

async function loadContracts() {
  loading.value = true
  try {
    contracts.value = await getAllContracts({
      search: search.value,
      status: filterStatus.value
    })
    fbOk.value = true
  } catch (e) {
    fbOk.value = false
    toast('Firebase error loading contracts', 'error')
  } finally {
    loading.value = false
  }
}

async function loadSavedTab() {
  loadingSaved.value = true
  openFolder.value   = null
  try {
    allContracts.value = await getAllContracts()
    const counts = {}
    await Promise.all(allContracts.value.map(async c => {
      const files = await getSavedFiles(c.id)
      counts[c.id] = files.length
    }))
    folderCounts.value = counts
    fbOk.value = true
  } catch (e) {
    toast('Error loading saved files', 'error')
  } finally {
    loadingSaved.value = false
  }
}

async function openFolderFor(c) {
  openFolder.value  = c
  loadingFiles.value = true
  try {
    folderFiles.value = await getSavedFiles(c.id)
  } catch (e) {
    toast('Could not load files', 'error')
    folderFiles.value = []
  } finally {
    loadingFiles.value = false
  }
}

async function loadRecentSaves() {
  if (!viewingContract.value) return
  loadingRecentSaves.value = true
  try {
    recentSaves.value = await getSavedFiles(viewingContract.value.id)
  } catch (e) {
    recentSaves.value = []
  } finally {
    loadingRecentSaves.value = false
  }
}

// ── SEARCH ─────────────────────────────────────────────────────
let searchTimer = null
function doSearch() {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(loadContracts, 350)
}

// ── TAB NAVIGATION ─────────────────────────────────────────────
async function goTab(t) {
  tab.value = t
  if (t === 'dashboard') await loadDashboard()
  if (t === 'contracts') await loadContracts()
  if (t === 'saved')     await loadSavedTab()
}

async function goToSavedFolder() {
  await goTab('saved')
  if (viewingContract.value) {
    await openFolderFor(viewingContract.value)
  }
}

// ── ACTIONS ────────────────────────────────────────────────────
function viewC(c) {
  viewingContract.value = c
  tab.value             = 'view'
  recentSaves.value     = []
  loadRecentSaves()
  scaleContract()
  window.addEventListener('resize', scaleContract, { once: false })
}

function openCreate() {
  editingContract.value = null
  showForm.value        = true
}

function openEdit(c) {
  editingContract.value = c
  showForm.value        = true
}

async function onSaved(msg) {
  showForm.value = false
  toast(msg)
  const freshList = await getAllContracts().catch(() => [])
  allContracts.value = freshList
  recent.value       = freshList.slice(0, 8)
  stats.value        = await getStats().catch(() => stats.value)
  if (tab.value === 'contracts') {
    contracts.value = await getAllContracts({
      search: search.value,
      status: filterStatus.value
    }).catch(() => contracts.value)
  }
  if (tab.value === 'view' && viewingContract.value) {
    const found = freshList.find(x => x.id === viewingContract.value.id)
    if (found) viewingContract.value = found
  }
}

async function delC(c) {
  if (!confirm('Delete contract for ' + c.last_name + ', ' + c.first_name + '?')) return
  try {
    await fbDelete(c.id)
    toast('Contract deleted.')
    if (tab.value === 'view') {
      viewingContract.value = null
      tab.value = 'contracts'
    }
    await loadDashboard()
    if (tab.value === 'contracts') await loadContracts()
  } catch (e) {
    toast('Delete failed: ' + e.message, 'error')
  }
}

// ── SAVE FILE ──────────────────────────────────────────────────
async function saveFile() {
  if (!viewingContract.value) {
    toast('No contract open to save', 'error')
    return
  }
  const c = viewingContract.value
  const ln = (c.last_name  || '').toUpperCase().replace(/\s+/g, '_')
  const fn = (c.first_name || '').toUpperCase().replace(/\s+/g, '_')
  const filename = ln + '_' + fn

  toast('Opening print window...')

  try {
    const pagesEl = document.getElementById('contract-pages')
    if (!pagesEl) throw new Error('Contract pages not found in DOM')

    const clone = pagesEl.cloneNode(true)
    clone.querySelectorAll('[contenteditable]').forEach(el => {
      el.removeAttribute('contenteditable')
      el.style.outline = ''
      el.style.background = ''
    })
    // Strip .ef red styling so print shows plain black text
    clone.querySelectorAll('.ef').forEach(el => {
      el.style.color = '#000'
      el.style.fontWeight = 'normal'
      el.style.borderBottom = 'none'
      el.style.background = 'transparent'
      el.style.padding = '0'
    })

    const pagesHTML = clone.outerHTML
    const html = buildSavedHTML(pagesHTML, c, filename)

    const printWin = window.open('', '_blank', 'toolbar=no,menubar=no,location=no,status=no,scrollbars=yes,width=900,height=800')
    printWin.document.write(html)
    printWin.document.close()
    printWin.onload = () => {
      printWin.document.title = ''
      printWin.focus()
      printWin.print()
    }

    try {
      await addSavedFile(c.id, { name: filename + '.pdf', type: 'pdf' })
      toast('Print window opened — Save as PDF: ' + filename + '.pdf')
      await loadRecentSaves()
      if (folderCounts.value[c.id] !== undefined) folderCounts.value[c.id]++
      else folderCounts.value[c.id] = 1
    } catch (e) {
      toast('Print window opened — Save as PDF')
    }
  } catch (e) {
    toast('Error: ' + e.message, 'error')
    console.error(e)
  }
}

function printContract() {
  if (!viewingContract.value) return
  const pagesEl = document.getElementById('contract-pages')
  if (!pagesEl) return
  const clone = pagesEl.cloneNode(true)
  clone.querySelectorAll('[contenteditable]').forEach(el => {
    el.removeAttribute('contenteditable')
    el.style.outline = ''
    el.style.background = ''
  })
  clone.querySelectorAll('.ef').forEach(el => {
    el.style.color = '#000'
    el.style.fontWeight = 'normal'
    el.style.borderBottom = 'none'
    el.style.background = 'transparent'
    el.style.padding = '0'
  })
  const c = viewingContract.value
  const filename = c.last_name + '_' + c.first_name + '_' + c.contract_no
  const html = buildSavedHTML(clone.outerHTML, c, filename)
  const printWin = window.open('', '_blank', 'toolbar=no,menubar=no,location=no,status=no,scrollbars=yes,width=900,height=800')
  printWin.document.write(html)
  printWin.document.close()
  printWin.onload = () => { printWin.document.title = ''; printWin.focus(); printWin.print() }
}

// ─────────────────────────────────────────────────────────────────────────────
// buildSavedHTML — the CSS here MUST mirror main.css exactly so print = preview
// Key values that must match:
//   .page-content  padding-right: 88px   (= right-sigs width 80px + 8px gap)
//   .right-sig-line margin-left:  20px   (fixed position inside the 80px column)
//   pages 4 & 5 (.bond-page without .has-sigs): padding-right: 35px
// ─────────────────────────────────────────────────────────────────────────────
function buildSavedHTML(pagesHTML, c, filename) {
  const title = filename || (c.last_name + '_' + c.first_name)
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title></title>
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { margin: 0; padding: 0; background: #fff; font-family: Arial, sans-serif; }

/* ── PAGE SETTINGS ── */
@page { margin: 0; padding: 0; size: 8.5in 13in; }

/* ── BOND PAGES CONTAINER ── */
.bond-pages { display: block; width: 8.5in; margin: 0 auto; }

/* ── BOND PAGE: fixed paper dimensions, never depends on screen width ── */
.bond-page {
  background: #fff;
  width: 8.5in;
  height: 13in;
  position: relative;
  font-family: Arial, sans-serif;
  font-size: 10pt;
  line-height: 1.5;
  overflow: hidden;
  page-break-after: always;
  break-after: page;
  display: flex;
  flex-direction: column;
}
.bond-page:last-child { page-break-after: avoid; break-after: avoid; }

/* ── RIGHT SIGNATURE COLUMN ── */
/* All values in pt/in so they scale correctly at any DPI */
.right-sigs {
  position: absolute;
  right: 0;
  top: 1.72in;
  bottom: 0.375in;
  width: 0.885in;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 10;
}
.right-sig {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 0.885in;
}
.right-sig-line {
  border-left: 0.5pt solid #333;
  height: 1.35in;
  width: 0;
  flex-shrink: 0;
  margin-left: 0.5in;
}
.right-sig-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}
.right-sig-text {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: 7pt;
  line-height: 1.3;
  font-family: Arial, sans-serif;
  text-align: center;
  border: none;
  padding: 0;
}

/* ── PAGE CONTENT ── */
.page-content {
  padding: 0;
  margin: 0;
  position: relative;
  z-index: 5;
  width: 8.5in;
  height: 13in;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* ── HEADER: edge-to-edge ── */
.page-header { width: 100%; margin: 0; padding: 0; display: block; }
.page-header img { width: 100%; height: auto; display: block; margin: 0; padding: 0; }

.page-num { display: none; }
.page-num-bottom {
  position: absolute;
  bottom: 0.1in;
  right: 0.73in;
  font-size: 10pt;
  color: #333;
  font-family: Arial, sans-serif;
  z-index: 10;
}

/* ── PAGE BODY ── */
/* right padding = right-sigs width (0.885in) + small gap */
.page-body { padding: 8pt 0.94in 8pt 0.375in; font-size: 10pt; font-family: Arial, sans-serif; position: relative; z-index: 5; }
.bond-page:not(.has-sigs) .page-body { padding-right: 0.36in; }
.page-body p { margin: 0; text-align: justify; font-family: Arial, sans-serif; font-size: 10pt; }
.page-body p.p-title  { text-align: center; }
.page-body p.p-center { text-align: center; }

/* ── PARAGRAPH STYLES ── */
.p-title        { text-align: center; font-size: 14pt; font-weight: bold; margin-bottom: 6pt; margin-top: 4pt; font-family: Arial, sans-serif; }
.p-center       { text-align: center; font-size: 10pt; margin-top: 4pt; font-family: Arial, sans-serif; }
.p-body         { text-indent: 31.5pt; margin-top: 20pt; text-align: justify; font-size: 10pt; font-family: Arial, sans-serif; }
.p-body-left    { text-indent: 31.5pt; margin-top: 8pt; text-align: left; font-size: 10pt; font-family: Arial, sans-serif; }
.p-parties      { padding-left: 31.5pt; line-height: 1.5; margin-top: 0; text-align: justify; font-size: 10pt; font-family: Arial, sans-serif; }
.p-parties-left { padding-left: 31.5pt; line-height: 1.5; margin-top: 0; text-align: left; font-size: 10pt; font-family: Arial, sans-serif; }
.p-whereas      { padding-left: 81pt; text-indent: -47pt; margin-top: 2pt; text-align: justify; font-size: 10pt; line-height: 1.4; font-family: Arial, sans-serif; }
.p-whereas-left { padding-left: 81pt; text-indent: -45pt; margin-top: 2pt; text-align: left; font-size: 10pt; line-height: 1.4; font-family: Arial, sans-serif; }
.p-now-therefore{ padding-left: 36pt; margin-top: 8pt; text-align: justify; font-size: 10pt; font-family: Arial, sans-serif; }
.p-num          { padding-left: 0; text-indent: 0; margin-top: 6pt; font-size: 10pt; font-family: Arial, sans-serif; }
.p-num-left     { padding-left: 0; text-indent: 0; margin-top: 6pt; font-size: 10pt; text-align: left; font-family: Arial, sans-serif; }
.p-num-head     { padding-left: 0; text-indent: 0; margin-top: 6pt; font-size: 10pt; font-family: Arial, sans-serif; }
.p-num-head-t   { padding-left: 30pt; text-indent: 0; margin-top: 6pt; font-size: 10pt; font-family: Arial, sans-serif; }
.p-num-desc     { font-style: italic; }
.p-num-body     { padding-left: 65pt; text-indent: 0; margin-top: 2pt; text-align: justify; font-size: 10pt; font-family: Arial, sans-serif; }
.p-num-body-p   { padding-left: 36pt; text-indent: 0; margin-top: 2pt; text-align: justify; font-size: 10pt; font-family: Arial, sans-serif; }
.p-list         { padding-left: 90pt; text-indent: 0; margin-top: 0; text-align: justify; font-size: 10pt; font-family: Arial, sans-serif; }
.list-num       { display: inline-block; width: 18pt; text-align: left; }
.p-ab-item      { padding-left: 78pt; text-indent: -14pt; margin-top: 4pt; font-size: 10pt; font-family: Arial, sans-serif; text-align: justify; }
.p-ab-body      { padding-left: 92pt; text-indent: 0; margin-top: 2pt; font-size: 10pt; font-family: Arial, sans-serif; text-align: justify; }
.ab-num         { display: inline-block; width: 14pt; text-align: left; }

/* ── DYNAMIC FIELDS: plain black in print ── */
.ef { color: #000 !important; border: none !important; border-bottom: none !important;
      background: transparent !important; font-weight: normal !important; padding: 0 !important; }

/* ── SIGNATURE BLOCK ── */
.sig-row  { display: grid; grid-template-columns: 1fr 1fr; gap: 26px; margin-top: 20px; }
.sig-block{ text-align: center; }
.sig-line { font-weight: bold; text-transform: uppercase; border-top: 1px solid #333;
            padding-top: 3px; margin-top: 50px; font-size: 10pt; display: inline-block;
            min-width: 195px; font-family: Arial, sans-serif; }
.sig-pos  { font-size: 10pt; font-family: Arial, sans-serif; }

/* ── TOR TABLE ── */
.tor-table    { width: 100%; border-collapse: collapse; font-size: 10pt; margin-top: 6px; font-family: Arial, sans-serif; }
.tor-table td { border: 1px solid #555; padding: 5px 8px; vertical-align: top; font-size: 10pt; font-family: Arial, sans-serif; }
.tor-label    { background: #f0f0f0; font-weight: bold; width: 35%; font-size: 10pt; }

/* ── PRINT ── */
@media print {
  .bond-pages { display: block !important; width: 8.5in !important; margin: 0 !important; }
  .bond-page  { width: 8.5in !important; height: 13in !important; overflow: hidden !important;
                page-break-after: always !important; break-after: page !important; }
  .bond-page:last-child { page-break-after: avoid !important; break-after: avoid !important; }
}
</style>
</head>
<body>
<div class="bond-pages">\${pagesHTML}</div>
</body>
</html>`
}


function downloadFile(f) {
  if (!viewingContract.value) { toast('No contract open', 'error'); return }
  const c = viewingContract.value
  const ln = (c.last_name  || '').toUpperCase().replace(/\s+/g, '_')
  const fn = (c.first_name || '').toUpperCase().replace(/\s+/g, '_')
  const filename = ln + '_' + fn

  const pagesEl = document.getElementById('contract-pages')
  if (!pagesEl) { toast('Contract not found in DOM', 'error'); return }

  const clone = pagesEl.cloneNode(true)
  clone.querySelectorAll('[contenteditable]').forEach(el => {
    el.removeAttribute('contenteditable')
    el.style.outline = ''
    el.style.background = ''
  })
  clone.querySelectorAll('.ef').forEach(el => {
    el.style.color = '#000'
    el.style.fontWeight = 'normal'
    el.style.borderBottom = 'none'
    el.style.background = 'transparent'
    el.style.padding = '0'
  })

  const html = buildSavedHTML(clone.outerHTML, c, filename)
  const printWin = window.open('', '_blank', 'toolbar=no,menubar=no,location=no,status=no,scrollbars=yes,width=900,height=800')
  printWin.document.write(html)
  printWin.document.close()
  printWin.onload = () => { printWin.document.title = ''; printWin.focus(); printWin.print() }
  toast('Opening PDF save window: ' + filename + '.pdf')
}

async function deleteFile(f, contractId) {
  if (!confirm('Delete "' + f.name + '"?')) return
  try {
    await deleteSavedFile(contractId, f.id)
    toast('File deleted.')
    if (openFolder.value) {
      await openFolderFor(openFolder.value)
    } else {
      await loadRecentSaves()
    }
    if (folderCounts.value[contractId] > 0) {
      folderCounts.value[contractId]--
    }
  } catch (e) {
    toast('Delete failed: ' + e.message, 'error')
  }
}

// ── HELPERS ────────────────────────────────────────────────────
function fmtN(n) {
  return Number(n || 0).toLocaleString('en-PH', { minimumFractionDigits: 2 })
}

let toastTimer = null
function toast(msg, type = 'success') {
  toastMsg.value  = msg
  toastType.value = type
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toastMsg.value = '' }, 3500)
}
</script>