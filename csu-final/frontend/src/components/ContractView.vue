<template>
  <div>
    <div class="bond-pages" id="contract-pages">

      <!-- ══ PAGE 1 ══ -->
      <div class="bond-page has-sigs">
        <div class="right-sigs">
          <div v-for="s in sigs" :key="s.n" class="right-sig">
            <div class="right-sig-line"></div>
            <div class="right-sig-inner"><div class="right-sig-text"><b>{{ s.n }}</b><br>{{ s.t }}</div></div>
          </div>
        </div>
        <div class="page-content">
          <div class="page-header"><img :src="headerImg" alt="CSU Header"></div>
          <div class="page-body">
            <p class="p-title" contenteditable="true" spellcheck="false" style="padding-bottom: 20px;font-family:Arial,sans-serif;font-size:16pt;font-weight:bold;">CONTRACT OF SERVICE</p>
            <p class="p-body-left" contenteditable="true" spellcheck="false" style="margin-bottom: 10px; margin-top:30px;font-size:10pt;font-family:Arial,sans-serif;text-indent:0;"><b>KNOW ALL MEN BY THESE PRESENTS:</b></p>
            <p class="p-body" contenteditable="true" spellcheck="false">This CONTRACT OF SERVICE (the <b>"Contract"</b>) is made and entered into by and between:</p>
            <p class="p-parties" contenteditable="true" spellcheck="false">The <b>CARAGA STATE UNIVERSITY</b>, a Higher Education Institution with office address at Ampayon, Butuan City, represented by its President, <b><u>ROLYN C. DAGUIL, Ph.D.</u></b></p>
            <p class="p-parties" contenteditable="true" spellcheck="false">herein referred as the &#x201C;<b>First Party</b>&#x201D;;</p> z
            <p class="p-center" contenteditable="true" spellcheck="false">&#x2013; and &#x2013;</p> <br>
            <p class="p-parties" contenteditable="true" spellcheck="false"><b><u><span class="ef">{{ contractName }}</span></u></b>, of legal age, <span class="ef">{{ c.civil_status }}</span>, Filipino, and with residence at <span class="ef">{{ c.address }}</span> herein referred as the &#x201C;<b>Second Party</b>&#x201D;</p> <br>
            <p class="p-center" contenteditable="true" spellcheck="false"><b>WITNESSETH THAT</b></p>

            <p class="p-whereas" contenteditable="true" spellcheck="false"><em>Whereas,</em> the <b>First Party</b> needs services as described herein, which services are not performed by regular CSU personnel and do not pertain to vacant regular <em>plantilla</em> positions of the CSU;</p>
            <p class="p-whereas" contenteditable="true" spellcheck="false"><em>Whereas,</em> <b>Second Party</b> has the education, experience and skills needed to provide such services;</p>
            <p class="p-whereas" contenteditable="true" spellcheck="false"><em>Whereas,</em> <b>Second Party</b> has offered to render such services, and the <b>First Party</b> has accepted such offer;</p>
            <p class="p-whereas" contenteditable="true" spellcheck="false"><em>Whereas,</em> <b>Second Party</b> shall perform work at a time and a schedule to be agreed upon by both parties;</p>
            <p class="p-whereas" contenteditable="true" spellcheck="false"><em>Whereas,</em> that it is understood that this contract does <b>NOT</b> create an Employer-Employee Relationship between the <b>First Party</b> and the <b>Second Party</b>, that the services rendered hereunder are not considered and will not be accredited as government service;</p> <br>

           <br> <p class="p-now-therefore" contenteditable="true" spellcheck="false"><b>NOW, THEREFORE,</b> the parties agree that:</p>

            <p class="p-num-head-t" contenteditable="true" spellcheck="false"><b style="padding-right:24pt">1.</b><b>Term of Contract.</b></p>
            <p class="p-num-body-p" contenteditable="true" spellcheck="false">The term of this contract commences from <b><u><span class="ef">{{ fmtDate(c.start_date) }}</span> to <span class="ef">{{ fmtDate(c.end_date) }}</span></u></b>, unless sooner terminated by either party for reasons authorized by law and upon written notice <b>Fifteen days</b> prior the date of effectivity.</p> <br>

            <p class="p-num-head-t" contenteditable="true" spellcheck="false"><b style="padding-right:24pt">2.</b><b>Duties and Responsibilities of Second Party:</b></p>
            <p class="p-num-body" contenteditable="true" spellcheck="false"><b>2.1</b>&emsp;the <b>Second Party</b> accepts the terms and conditions set forth in this contract and agrees to devote his/her full time and attention to the performance of his/her duties under this contract and perform functions as described on the <b>Specific Terms of Reference</b> of his/her office/station which form part of this contract;</p>
            <p class="p-num-body" contenteditable="true" spellcheck="false"><b>2.2</b>&emsp;The <b>Second Party</b> shall abide to the University Rules and Regulations as well as policies promulgated by the duly constituted authorities that includes but not limited to the following:</p>
            <p class="p-list" contenteditable="true" spellcheck="false"><span class="list-num">i.</span>University Code;</p>
            <p class="p-list" contenteditable="true" spellcheck="false"><span class="list-num">ii.</span>Eco-Friendly University Policy based on Memorandum Order No. 12, s.2018</p>
            <p class="p-list" contenteditable="true" spellcheck="false"><span class="list-num">iii.</span>No Smoking Policy</p>
            <p class="p-list" contenteditable="true" spellcheck="false"><span class="list-num">iv.</span>Drug Free Workplace Policy in accordance with the Comprehensive Dangerous <b>Drugs Act</b> of 2002 or Republic <b>Act</b> No. 9165</p>
            <p class="p-list" contenteditable="true" spellcheck="false"><span class="list-num">v.</span>Other reasonable office rules and regulations being implemented in CSU, such as but not limited to dress code, work schedule and arrangements, etc;</p>
          </div>
          <div class="page-num-bottom">Page 1 of 5</div>
        </div>
      </div>

      <!-- ══ PAGE 2 ══ -->
      <div class="bond-page has-sigs">
        <div class="right-sigs">
          <div v-for="s in sigs" :key="s.n" class="right-sig">
            <div class="right-sig-line"></div>
            <div class="right-sig-inner"><div class="right-sig-text"><b>{{ s.n }}</b><br>{{ s.t }}</div></div>
          </div>
        </div>
        <div class="page-content">
          <div class="page-header"><img :src="headerImg" alt="CSU Header"></div>
          <div class="page-body">
            <p class="p-num-body" contenteditable="true" spellcheck="false"><b>2.3</b>&emsp;The <b>Second Party</b> is expected to support and participate to all University wide events that require attendance and/or participation as duly called for by the Office of the President without additional compensation;</p>
            <p class="p-num-body" contenteditable="true" spellcheck="false"><b>2.4</b>&emsp;The <b>First Party</b> may require <b>Second Party</b> to render service outside of the agreed regular working hours (Overtime) or during Saturdays, Sundays and holidays in exigency of service and/or whenever necessary to protect the interest of the University, avoid irreparable damage and during emergency cases, subject to payment of overtime fee by the <b>First Party</b> without prejudice to the observance of University Memorandum No. 111, s.2016 (Rules on Overtime).</p>
            <p class="p-num-body" contenteditable="true" spellcheck="false"><b>2.5</b>&emsp;the <b>Second Party</b> may be assigned to special task by the <b>First party</b> (field work or to travel in relation to the performance of Duties and Responsibilities), at the expense of the latter subject to the prevailing COA and DBM rules as well as the usual auditing and accounting rules;</p>
            <p class="p-num-body" contenteditable="true" spellcheck="false"><b>2.6</b>&emsp;If necessary, to ensure efficient rendition of the contracted service, <em>the <b>First Party</b> may require <b>Second Party</b> to attend seminars, trainings, and the like activities in the local, regional, national and/or international levels relevant to the <b>Second Party&#x2019;s</b> tasks and/or functions which can contribute to the achievement of the University&#x2019;s targets and in consonance with the University Policy and Guidelines on Foreign Travel.</em> If the training cost is shouldered by the <b>First party</b>, the <b>Second Party</b> shall ensure the return of investment in the form of service under this Contract for at least <b>three (3) months</b> or the remainder of the period of effectivity of this Contract, whichever period is shorter. Should <b>Second Party</b> fail to do so, <b>Second Party</b> shall refund the <b>First Party</b> for the cost of such training;</p>
            <p class="p-num-body" contenteditable="true" spellcheck="false"><b>2.7</b>&emsp;Perform other related tasks and responsibilities assigned by the <b>First Party.</b></p>

            <p class="p-num-head-t" contenteditable="true" spellcheck="false"><b style="padding-right:24pt">3.</b><b>Compensation</b></p>
            <p class="p-num-body" contenteditable="true" spellcheck="false"><b>3.1</b>&emsp;For services rendered under this Contract, <b>Second Party</b> shall receive a daily compensation in the total amount of <u><b><span class="ef">{{ c.rate_in_words }}</span> ( &#8369;<span class="ef">{{ fmtNum(c.daily_rate) }}</span>)</b></u> particularly described in the attached Terms of Reference, subject to the submission of Accomplishment Report/s and duly signed Daily Time Records (DTRs);</p>
            <p class="p-num-body" contenteditable="true" spellcheck="false"><b>3.2 Overtime Pay</b> in cases stipulated in Item 2.4 of this contract in accordance with the University policy on Overtime;</p>
            <p class="p-num-body" contenteditable="true" spellcheck="false"><b>3.3 &#x201C;No Work No Pay Policy&#x201D;</b> is understood to be observed with this contract.</p>

            <p class="p-num-head-t" contenteditable="true" spellcheck="false"><b style="padding-right:24pt">4.</b><b>Miscellaneous Provisions</b></p>
            <p class="p-num-body" contenteditable="true" spellcheck="false"><b>4.1</b>&emsp;Second Party warrants that he/she has not been previously dismissed from government service by reason of an administrative offense.</p>

            <p class="p-num-body" contenteditable="true" spellcheck="false"><b>4.2</b>&emsp;Second Party authorizes the First Party to deduct from Second Party&#x2019;s compensation mandatory contributions as a self-employed individual and remit the same to the Social Security System (SSS), Philippine Health Insurance Corporation (PhilHealth) and Home Development Mutual Fund (HDMF/PAG-IBIG) accordingly, in accordance with applicable laws and policies. It is understood that for this purpose, the First Party shall only be acting as a collecting and remitting agent.</p>
            <p class="p-list" contenteditable="true" spellcheck="false"><span class="list-num"><b>a.</b></span>Lecturers and Project Staff with mother agency </p>
            <p class="p-list" contenteditable="true" spellcheck="false"><b style="padding-left:23px">The identified Mother Agency</b> will be the one to deduct the mandatory contributions.</p>
            <p class="p-list" contenteditable="true" spellcheck="false"><span class="list-num"><b>b.</b></span>Lecturers and Project Staff without mother agency</p>
            <p class="p-list" contenteditable="true" spellcheck="false"><b style="padding-left:23px">The identified Mother Agency</b> <b>The First Party</b> will be the one to deduct the mandatory contributions subject to the concerned staff&#x2019;s request for voluntary deduction/s addressed to the HRMO. It is understood that for this purpose, the <b>First Party</b> shall only be acting as a collecting and remitting agent.</p>

            <p class="p-num-body" contenteditable="true" spellcheck="false"><b>4.3</b>&emsp;It is understood that no other benefits (not mentioned) hereto shall apply to the Second Party unless otherwise sanctioned by the University.</p>
            <p class="p-num-body" contenteditable="true" spellcheck="false"><b>4.4</b>&emsp;This contract may be renewed at the agreement of both parties subject to evaluation of performance of the Second Party and availability of funds.</p>
            <p class="p-num-body" contenteditable="true" spellcheck="false"><b>4.5</b>&emsp;In case of non-renewal of Contract the release of last salary shall be only upon submission of a University Clearance.</p>
          </div>
          <div class="page-num-bottom">Page 2 of 5</div>
        </div>
      </div>

      <!-- ══ PAGE 3 ══ -->
      <div class="bond-page has-sigs">
        <div class="right-sigs">
          <div v-for="s in sigs" :key="s.n" class="right-sig">
            <div class="right-sig-line"></div>
            <div class="right-sig-inner"><div class="right-sig-text"><b>{{ s.n }}</b><br>{{ s.t }}</div></div>
          </div>
        </div>
        <div class="page-content">
          <div class="page-header"><img :src="headerImg" alt="CSU Header"></div>
          <div class="page-body">
            <p class="p-num-body" contenteditable="true" spellcheck="false"><b>4.6</b>&emsp;Data Privacy Notice. This contract, in line with the Data Privacy Act of 2012, is committed to protect and secure personal information obtained in the process of performance of its mandate. The personal and other information you provided herein will be processed and utilized solely for official purposes only by the <b>First Party</b> and will not be shared with any outside parties unless written consent from the <b>Second Party</b> or approved communication by the <b>First Party</b> is secured.</p>

            <p class="p-num-head" contenteditable="true" spellcheck="false"><b style="padding-right:24pt">5.</b><b>ADDITIONAL COMPENSATION PROVISIONS</b></p>
            <p class="p-num-body" contenteditable="true" spellcheck="false"><b>5.1</b>&emsp;The First Party shall ensure the timely scheduling and release of salaries in accordance with the memorandum order governing payroll processes. Salaries shall be disbursed no later than five (5) working days following the designated cut-off period.</p>
            <p class="p-num-body" contenteditable="true" spellcheck="false"><b>5.2</b>&emsp;Salary disbursements are contingent on the timely submission of complete payroll documents by the respective departments/offices. These documents must be submitted no later than 12:00 noon on the next working day following the end of the cut-off periods, specifically the 15th and the 30th/31st of each month. Disbursements shall follow the pre-approved payroll schedule unless modified by mutual agreement or in the event of unforeseen circumstances.</p>
            <p class="p-num-body" contenteditable="true" spellcheck="false"><b>5.3</b>&emsp;Failure to submit the required payroll documents within the prescribed cut-off period will result in the salary being released during the next payroll cycle or upon submission and compliance with requirements, whichever is earlier.</p>
            <p class="p-num-body" contenteditable="true" spellcheck="false"><b>5.4</b>&emsp;Deductions such as mandatory contributions, loans, taxes, and penalties shall be automatically applied to employees&#x2019; salaries in accordance with applicable laws and University policies. Employees must provide their membership account numbers and related details to facilitate accurate processing. Failure to do so may lead to delays or non-remittance of applicable payments.</p>
            <p class="p-num-body" contenteditable="true" spellcheck="false"><b>5.5</b>&emsp;In cases of unavoidable delays, including holidays or work suspensions, employees shall be promptly informed by the First Party through the Human Resource Management System (HRMS) of the adjusted release date.</p>
            <p class="p-num-body" contenteditable="true" spellcheck="false"><b>5.6</b>&emsp;Concerns regarding salary release must be communicated through the appropriate channels to ensure prompt resolution.</p>
          </div>
          <div class="page-num-bottom">Page 3 of 5</div>
        </div>
      </div>

      <!-- ══ PAGE 4 — TOR ══ -->
      <div class="bond-page">
        <div class="page-content">
          <div class="page-header"><img :src="headerImg" alt="CSU Header"></div>
          <div class="page-body">
            <p class="p-title" contenteditable="true" spellcheck="false" style="font-family:Arial,sans-serif;font-size:12pt;font-weight:bold;">SPECIFIC TERMS OF REFERENCE</p>
            <p class="p-center" style="margin-bottom:30px" contenteditable="true" spellcheck="false"><b>CY {{ contractYear }}</b></p>
            <table class="tor-table">
              <tr><td class="tor-label">NAME OF SECOND PARTY</td><td contenteditable="true" spellcheck="false"><b><span class="ef">{{ contractName }}</span></b></td></tr>
              <tr><td class="tor-label">SIGNATURE OF SECOND PARTY</td><td style="height:44px"></td></tr>
              <tr><td class="tor-label">JOB TITLE</td><td><span class="ef" contenteditable="true" spellcheck="false">{{ c.job_title || c.position_title }}</span></td></tr>
              <tr><td class="tor-label">OFFICIAL STATION</td><td><span class="ef" contenteditable="true" spellcheck="false">{{ c.official_station }}</span></td></tr>
              <tr>
                <td class="tor-label">ENGAGEMENT PERIOD</td>
                <td contenteditable="true" spellcheck="false"><span class="ef">{{ fmtDate(c.start_date) }}</span>&nbsp;TO&nbsp;<span class="ef">{{ fmtDate(c.end_date) }}</span></td>
              </tr>
              <tr>
                <td class="tor-label">TOTAL COMPENSATION<br>(IN WORDS &amp; IN FIGURES)</td>
                <td contenteditable="true" spellcheck="false"><span class="ef">{{ c.rate_in_words }}</span> (&#8369;<span class="ef">{{ fmtNum(c.daily_rate) }}</span>)</td>
              </tr>
              <tr><td class="tor-label">FUND SOURCE</td><td><span class="ef" contenteditable="true" spellcheck="false">{{ c.fund_source }}</span></td></tr>
              <tr>
                <td class="tor-label">FUNCTIONS AND<br>RESPONSIBILITIES</td>
                <td>
                  <ul style="padding-left:16px;margin:4px 0;font-size:10pt">
                    <li v-for="(fn, i) in functionsList" :key="i" contenteditable="true" spellcheck="false" style="margin-bottom:2px">{{ fn }}</li>
                    <li v-if="!functionsList.length" contenteditable="true" spellcheck="false">Click to add functions</li>
                  </ul>
                </td>
              </tr>
            </table>
            <div style="text-align:right;margin-top:16px;padding-right:8px">
              <div style="min-width:210px;text-align:center">
                <div style="margin-bottom:22px;font-size:10pt;font-family:Arial,sans-serif" contenteditable="true" spellcheck="false">Noted by:</div>
                <div style="width:200px;margin:0 auto;">
                  <div style="font-weight:bold;font-size:10pt;font-family:Arial,sans-serif" contenteditable="true" spellcheck="false">{{ c.noted_by_name || 'ENGR. MARIEL M. DELO' }}</div>
                  <div style="font-size:9pt;font-family:Arial,sans-serif" contenteditable="true" spellcheck="false">{{ c.noted_by_position || 'Director, GSO' }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="page-num-bottom">Page 4 of 5</div>
        </div>
      </div>

      <!-- ══ PAGE 5 — ACKNOWLEDGEMENT ══ -->
      <div class="bond-page">
        <div class="page-content">
          <div class="page-header"><img :src="headerImg" alt="CSU Header"></div>
          <div class="page-body">
            <p class="p-title" style="padding-top:30px;font-size:12.5pt;font-family:Arial,sans-serif;font-weight:bold;" contenteditable="true" spellcheck="false">ACKNOWLEDGEMENT</p>
            <p style="margin:40px 0 0 0;font-size:10pt;font-family:Arial,sans-serif;text-align:left" contenteditable="true" spellcheck="false">REPUBLIC OF THE PHILIPPINES)</p>
            <p style="margin:0;font-size:10pt;font-family:Arial,sans-serif;text-align:left" contenteditable="true" spellcheck="false">CITY OF BUTUAN &#x2026;&#x2026;&#x2026;&#x2026;&#x2026;&#x2026;&#x2026;.) SS.</p>
            <p style="margin:0;font-size:10pt;font-family:Arial,sans-serif;text-align:left" contenteditable="true" spellcheck="false"><b>X----------------------------------------.</b>)</p>
            <p style="margin-top:15px;font-size:10pt;font-family:Arial,sans-serif;text-align:left;" contenteditable="true" spellcheck="false">Before Me, a Notary Public for and in Butuan City, this ____________ day of ____________ 2026 personally appeared:</p>
            <table style="width:100%;border-collapse:collapse;margin-top:12px;font-size:10pt;font-family:Arial,sans-serif;table-layout:fixed">
              <tr>
                <td style="width:55%;padding:2px 0;font-size:10pt">&nbsp;</td>
                <td style="text-align:right;font-size:10pt;font-weight:bold" contenteditable="true" spellcheck="false">Competent Evidence of Identity (CEI)</td>
              </tr>
              <tr>
                <td style="padding:4px 0;font-size:10pt" contenteditable="true" spellcheck="false"><b>ROLYN C. DAGUIL, Ph.D.</b></td>
                <td style="text-align:right;font-size:10pt" contenteditable="true" spellcheck="false">ID. NO. M98-009</td>
              </tr>
              <tr>
                <td style="padding:4px 0 16px 0;font-size:10pt" contenteditable="true" spellcheck="false"><b>{{ contractName }}</b></td>
                <td style="text-align:right;padding-bottom:16px;font-size:10pt" contenteditable="true" spellcheck="false">______________</td>
              </tr>
            </table>
            <p style="margin:8px 0 0 0;font-size:10pt;font-family:Arial,sans-serif;text-align:left" contenteditable="true" spellcheck="false">,who</p>
            <p style="margin:4px 0 0 48px;font-size:10pt;font-family:Arial,sans-serif;text-align:left" contenteditable="true" spellcheck="false">______ is/are personally known to me</p>
            <p style="margin:2px 0 0 48px;font-size:10pt;font-family:Arial,sans-serif;text-align:left" contenteditable="true" spellcheck="false">______ exhibited (a) competent evidence/s of identity/ies as stated above</p>
            <p style="margin:8px 0 0 0;font-size:10pt;font-family:Arial,sans-serif;text-align:justify" contenteditable="true" spellcheck="false">and known to me to be the same person/s who executed the foregoing instruments which consist of one (1) page sealed with my notarial seal and she/he/they acknowledged to me that his/her/their signature on the instrument was/were freely and voluntarily affixed by him/her/them for purposes stated therein.</p>
            <p style="margin:12px 0 0 48px;font-size:10pt;font-family:Arial,sans-serif;text-align:justify" contenteditable="true" spellcheck="false">He/She/They further declared that he/she/they has/have the authority to sign in behalf of the principal that he/she/they represent(s).</p>
            <p style="margin:12px 0 0 48px;font-size:10pt;font-family:Arial,sans-serif;text-align:justify" contenteditable="true" spellcheck="false"><b>WITNESS MY HAND AND SEAL</b> on the date and on the place first above mentioned.</p>
            <div style="margin-top:28px;font-size:10pt;font-family:Arial,sans-serif;line-height:1.9">
              <div contenteditable="true" spellcheck="false">DOC. NO. &nbsp;&nbsp;<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u></div>
              <div contenteditable="true" spellcheck="false">PAGE NO. &nbsp;<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u></div>
              <div contenteditable="true" spellcheck="false">BOOK NO. &nbsp;<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u></div>
              <div contenteditable="true" spellcheck="false">SERIES OF &nbsp;<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u></div>
            </div>
          </div>
          <div class="page-num-bottom">Page 5 of 5</div>
        </div>
      </div>

    </div><!-- /bond-pages -->
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  c:         { type: Object, required: true },
  headerImg: { type: String, default: '' },
  bagongImg: { type: String, default: '' }
})

const contractName = computed(() => {
  return [props.c.first_name, props.c.middle_initial, props.c.last_name]
    .filter(Boolean).join(' ')
})

const contractYear = computed(() => {
  if (!props.c.start_date) return new Date().getFullYear()
  return new Date(props.c.start_date + 'T00:00:00').getFullYear()
})

const sigs = computed(() => [
  { n: contractName.value || 'SECOND PARTY',       t: 'Second Party' },
  { n: 'ENGR. MARIEL M. DELO',                      t: 'Director, GSO' },
  { n: 'MAY A. OCAREZ, RGC',                        t: 'HRMO III' },
  { n: 'MERINESSA D. GONZAGA',                       t: 'Chief Administrative Officer (FMO II)' },
  { n: 'ALEXANDER T. DEMETILLO, D.Eng.',             t: 'VP for Administration & Finance' },
  { n: 'ROLYN C. DAGUIL, Ph.D.',                     t: 'University President' },
])

const functionsList = computed(() =>
  (props.c.functions || '').split('\n').filter(x => x.trim())
)

function fmtDate(d) {
  if (!d) return '___________'
  try {
    return new Date(d + 'T00:00:00').toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    })
  } catch (e) { return d }
}

function fmtNum(n) {
  return Number(n || 0).toLocaleString('en-PH', { minimumFractionDigits: 2 })
}
</script>