// generateDocx.js - Generates Word .docx contract file using docx library via CDN-style dynamic import
// Since we can't use npm docx in browser directly, we generate an HTML blob that Word can open

export async function generateContractDocx(c) {
  const name = [c.first_name, c.middle_initial, c.last_name].filter(Boolean).join(' ')
  const year = c.start_date ? new Date(c.start_date + 'T00:00:00').getFullYear() : new Date().getFullYear()

  function fmtDate(d) {
    if (!d) return '___________'
    try {
      return new Date(d + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    } catch (e) { return d }
  }

  function fmtNum(n) {
    return Number(n || 0).toLocaleString('en-PH', { minimumFractionDigits: 2 })
  }

  const functions = (c.functions || '').split('\n').filter(x => x.trim())
    .map(f => `<li style="font-size:10pt;margin-bottom:3px">${f}</li>`).join('') ||
    '<li style="font-size:10pt">—</li>'

  // Word-compatible HTML (opens properly in MS Word / WPS)
  const html = `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<title>${c.last_name}, ${c.first_name} - Contract of Service</title>
<!--[if gte mso 9]>
<xml>
  <w:WordDocument>
    <w:View>Print</w:View>
    <w:Zoom>100</w:Zoom>
    <w:DoNotOptimizeForBrowser/>
  </w:WordDocument>
</xml>
<![endif]-->
<style>
  @page {
    size: 8.5in 13in;
    margin: 1in 1in 1in 1in;
    mso-page-orientation: portrait;
  }
  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 10pt;
    line-height: 1.5;
    color: #000;
  }
  p { margin: 0 0 0 0; text-align: justify; font-size: 10pt; font-family: Arial, sans-serif; }
  .p-title { text-align: center; font-size: 14pt; font-weight: bold; text-decoration: underline; letter-spacing: 0.5px; margin-bottom: 4pt; }
  .p-center { text-align: center; font-size: 10pt; }
  .p-body { text-indent: 36pt; margin-top: 6pt; font-size: 10pt; text-align: justify; }
  .p-parties { margin-left: 42pt; margin-right: 42pt; font-size: 10pt; line-height: 2; text-align: justify; }
  .p-whereas { margin-left: 81pt; text-indent: -45pt; font-size: 10pt; text-align: justify; }
  .p-num { margin-left: 36pt; margin-top: 4pt; font-size: 10pt; }
  .p-num-body { margin-left: 36pt; font-size: 10pt; text-align: justify; }
  .p-list { margin-left: 81pt; font-size: 10pt; text-align: justify; }
  .sig-table { width: 100%; border-collapse: collapse; margin-top: 24pt; }
  .sig-cell { text-align: center; width: 50%; padding: 0 12pt; vertical-align: top; }
  .sig-line { border-top: 1px solid #333; padding-top: 2pt; font-weight: bold; font-size: 10pt; min-width: 150pt; display: inline-block; }
  .sig-pos { font-size: 9pt; }
  .tor-table { width: 100%; border-collapse: collapse; font-size: 10pt; margin-top: 6pt; }
  .tor-table td { border: 1px solid #555; padding: 4pt 6pt; vertical-align: top; font-size: 10pt; }
  .tor-label { background: #f0f0f0; font-weight: bold; width: 35%; }
  .page-break { page-break-after: always; }
  .right-col { width: 48pt; border-left: 1px solid #888; font-size: 6pt; }
</style>
</head>
<body>

<!-- PAGE 1 -->
<p class="p-title">CONTRACT OF SERVICE</p>
<p class="p-body"><b>KNOW ALL MEN BY THESE PRESENTS:</b></p>
<p class="p-body">This <b>CONTRACT OF SERVICE</b> (the &#x201C;<b>Contract</b>&#x201D;) is made and entered into by and between:</p>
<p class="p-parties">The <b>CARAGA STATE UNIVERSITY</b>, a Higher Education Institution with office address at Ampayon, Butuan City, represented by its President, <b><u>ROLYN C. DAGUIL, Ph.D.</u></b></p>
<p class="p-parties">herein referred as the &#x201C;<b>First Party</b>&#x201D;;</p>
<p class="p-center">&#x2013; and &#x2013;</p>
<p class="p-parties"><b><u>${name}</u></b>, of legal age, ${c.civil_status || '______'}, Filipino, and with residence at ${c.address || '______'} herein referred as the &#x201C;<b>Second Party</b>&#x201D;</p>
<p class="p-center"><b>WITNESSETH that</b></p>
<p class="p-whereas"><em>Whereas</em>, the <b>First Party</b> needs services as described herein, which services are not performed by regular CSU personnel and do not pertain to vacant regular <em>plantilla</em> positions of the CSU;</p>
<p class="p-whereas"><em>Whereas</em>, <b>Second Party</b> has the education, experience and skills needed to provide such services;</p>
<p class="p-whereas"><em>Whereas</em>, <b>Second Party</b> has offered to render such services, and the <b>First Party</b> has accepted such offer;</p>
<p class="p-whereas"><em>Whereas,</em> <b>Second Party</b> shall perform work at a time and a schedule to be agreed upon by both parties;</p>
<p class="p-whereas"><em>Whereas,</em> that it is understood that this contract does <b>NOT</b> create an Employer-Employee Relationship between the <b>First Party</b> and the <b>Second Party</b>, that the services rendered hereunder are not considered and will not be accredited as government service;</p>
<p class="p-body"><b>NOW, THEREFORE,</b> the parties agree that:</p>
<p class="p-num"><b>1.&nbsp;&nbsp;&nbsp; Term of Contract.</b></p>
<p class="p-num-body">The term of this contract commences from <b><u>${fmtDate(c.start_date)} to ${fmtDate(c.end_date)}</u></b>, unless sooner terminated by either party for reasons authorized by law and upon written notice <b>Fifteen days</b> prior the date of effectivity.</p>
<p class="p-num"><b>2.&nbsp;&nbsp;&nbsp; Duties and Responsibilities of Second Party:</b></p>
<p class="p-num-body"><b>2.1</b> the <b>Second Party</b> accepts the terms and conditions set forth in this contract and agrees to devote his/her full time and attention to the performance of his/her duties under this contract and perform functions as described on the <b>Specific Terms of Reference</b> of his/her office/station which form part of this contract;</p>
<p class="p-num-body"><b>2.2</b> The <b>Second Party</b> shall abide to the University Rules and Regulations as well as policies promulgated by the duly constituted authorities that includes but not limited to the following:</p>
<p class="p-list">i.&nbsp;&nbsp;&nbsp;&nbsp; University Code;</p>
<p class="p-list">ii.&nbsp;&nbsp;&nbsp; Eco-Friendly University Policy based on Memorandum Order No. 12, s.2018</p>
<p class="p-list">iii.&nbsp;&nbsp; No Smoking Policy</p>
<p class="p-list">iv.&nbsp;&nbsp; Drug Free Workplace Policy in accordance with the Comprehensive Dangerous <b>Drugs Act</b> of 2002 or Republic <b>Act</b> No. 9165</p>
<p class="p-list">v.&nbsp;&nbsp;&nbsp;&nbsp; Other reasonable office rules and regulations being implemented in CSU, such as but not limited to dress code, work schedule and arrangements, etc;</p>

<div class="page-break"></div>

<!-- PAGE 2 -->
<p class="p-num-body"><b>2.3</b> The <b>Second Party</b> is expected to support and participate to all University wide events that require attendance and/or participation as duly called for by the Office of the President without additional compensation;</p>
<p class="p-num-body"><b>2.4</b> The <b>First Party</b> may require <b>Second Party</b> to render service outside of the agreed regular working hours (Overtime) or during Saturdays, Sundays and holidays in exigency of service and/or whenever necessary to protect the interest of the University, avoid irreparable damage and during emergency cases, subject to payment of overtime fee by the <b>First Party</b> without prejudice to the observance of University Memorandum No. 111, s.2016 (Rules on Overtime).</p>
<p class="p-num-body"><b>2.5</b> the <b>Second Party</b> may be assigned to special task by the <b>First party</b> (field work or to travel in relation to the performance of Duties and Responsibilities), at the expense of the latter subject to the prevailing COA and DBM rules as well as the usual auditing and accounting rules;</p>
<p class="p-num-body"><b>2.6</b> If necessary, to ensure efficient rendition of the contracted service, <em>the <b>First Party</b> may require <b>Second Party</b> to attend seminars, trainings, and the like activities</em> relevant to the <em><b>Second Party&#x2019;s</b></em> tasks. If the training cost is shouldered by the <b>First party</b>, the <b>Second Party</b> shall ensure the return of investment in the form of service under this Contract for at least <u>three (3) months</u> or the remainder of the period of effectivity of this Contract, whichever period is shorter.</p>
<p class="p-num-body"><b>2.7</b> Perform other related tasks and responsibilities assigned by the <b>First Party.</b></p>
<p class="p-num"><b>3.&nbsp;&nbsp;&nbsp; Compensation</b></p>
<p class="p-num-body"><b>3.1</b> For services rendered under this Contract, <b>Second Party</b> shall receive a daily compensation in the total amount of ${c.rate_in_words || '______'} (&#8369;${fmtNum(c.daily_rate)}) particularly described in the attached Terms of Reference, subject to the submission of Accomplishment Reports and duly signed Daily Time Records (DTRs).</p>
<p class="p-num-body"><b>3.2 Overtime Pay</b> in cases stipulated in Item 2.4 of this contract in accordance with the University policy on Overtime.</p>
<p class="p-num-body"><b>3.3 &#x201C;No Work No Pay Policy&#x201D;</b> is understood to be observed with this contract.</p>
<p class="p-num"><b>4.&nbsp;&nbsp;&nbsp; Miscellaneous Provisions</b></p>
<p class="p-num-body"><b>4.1</b> Second Party warrants that he/she has not been previously dismissed from government service by reason of an administrative offense.</p>
<p class="p-num-body"><b>4.2</b> Second Party authorizes the First Party to deduct from Second Party&#x2019;s compensation mandatory contributions as a self-employed individual and remit the same to the SSS, PhilHealth and PAGIBIG/HDMF accordingly, in accordance with applicable laws and policies.</p>
<p class="p-num-body"><b>4.3</b> It is understood that no other benefits (not mentioned) hereto shall apply to the Second Party unless otherwise sanctioned by the University.</p>
<p class="p-num-body"><b>4.4</b> This contract may be renewed at the agreement of both parties subject to evaluation of performance of the Second Party and availability of funds.</p>
<p class="p-num-body"><b>4.5</b> In case of non-renewal of Contract the release of last salary shall be only upon submission of a University Clearance.</p>
<p class="p-num-body"><b>4.6</b> Data Privacy Notice. This contract, in line with the Data Privacy Act of 2012, is committed to protect and secure personal information obtained in the process of performance of its mandate.</p>

<div class="page-break"></div>

<!-- PAGE 3 -->
<p class="p-num"><b>5.&nbsp;&nbsp;&nbsp; ADDITIONAL COMPENSATION PROVISIONS</b></p>
<p class="p-num-body"><b>1.1</b> The First Party shall ensure the timely scheduling and release of salaries in accordance with the memorandum order governing payroll processes. Salaries shall be disbursed no later than five (5) working days following the designated cut-off period.</p>
<p class="p-num-body"><b>1.2</b> Salary disbursements are contingent on the timely submission of complete payroll documents by the respective departments/offices. These documents must be submitted no later than 12:00 noon on the next working day following the end of the cut-off periods.</p>
<p class="p-num-body"><b>1.3</b> Failure to submit the required payroll documents within the prescribed cut-off period will result in the salary being released during the next payroll cycle or upon submission and compliance with requirements, whichever is earlier.</p>
<p class="p-num-body"><b>1.4</b> Deductions such as mandatory contributions, loans, taxes, and penalties shall be automatically applied to employees&#x2019; salaries in accordance with applicable laws and University policies.</p>
<p class="p-num-body"><b>1.5</b> In cases of unavoidable delays, including holidays or work suspensions, employees shall be promptly informed by the First Party through the Human Resource Management System (HRMS) of the adjusted release date.</p>
<p class="p-num-body"><b>1.6</b> Concerns regarding salary release must be communicated through the appropriate channels to ensure prompt resolution.</p>

<table class="sig-table">
  <tr>
    <td class="sig-cell">
      <div style="height:36pt"></div>
      <div class="sig-line">ROLYN C. DAGUIL, Ph.D.</div>
      <div class="sig-pos">University President</div>
    </td>
    <td class="sig-cell">
      <div style="height:36pt"></div>
      <div class="sig-line">${name.toUpperCase()}</div>
      <div class="sig-pos">Second Party</div>
    </td>
  </tr>
</table>
<p style="text-align:center;margin-top:20pt;font-size:10pt">Noted by:</p>
<p style="text-align:center;margin-top:20pt;font-size:10pt"><span style="border-top:1px solid #333;padding-top:2pt;font-weight:bold;display:inline-block;min-width:180pt">${c.noted_by_name || '______'}</span></p>
<p style="text-align:center;font-size:9pt">${c.noted_by_position || '______'}</p>

<div class="page-break"></div>

<!-- PAGE 4 - TOR -->
<p class="p-title">SPECIFIC TERMS OF REFERENCE</p>
<p class="p-center"><b>CY ${year}</b></p>
<table class="tor-table" style="margin-top:8pt">
  <tr><td class="tor-label">NAME OF SECOND PARTY</td><td><b>${name}</b></td></tr>
  <tr><td class="tor-label">SIGNATURE OF SECOND PARTY</td><td style="height:44pt"></td></tr>
  <tr><td class="tor-label">JOB TITLE</td><td>${c.job_title || c.position_title || '______'}</td></tr>
  <tr><td class="tor-label">OFFICIAL STATION</td><td>${c.official_station || '______'}</td></tr>
  <tr><td class="tor-label">ENGAGEMENT PERIOD</td><td>${fmtDate(c.start_date)} TO ${fmtDate(c.end_date)}</td></tr>
  <tr><td class="tor-label">TOTAL COMPENSATION (IN WORDS &amp; IN FIGURES)</td><td>${c.rate_in_words || '______'} (&#8369;${fmtNum(c.daily_rate)})</td></tr>
  <tr><td class="tor-label">FUND SOURCE</td><td>${c.fund_source || '______'}</td></tr>
  <tr><td class="tor-label">FUNCTIONS AND RESPONSIBILITIES</td><td><ul style="padding-left:16pt;margin:4pt 0">${functions}</ul></td></tr>
</table>
<div style="text-align:right;margin-top:16pt">
  <p style="font-size:10pt;margin-bottom:20pt">Noted by:</p>
  <span style="border-top:1px solid #333;padding-top:2pt;font-weight:bold;font-size:10pt;display:inline-block;min-width:180pt">${c.noted_by_name || '______'}</span><br>
  <span style="font-size:9pt">${c.noted_by_position || '______'}</span>
</div>

<div class="page-break"></div>

<!-- PAGE 5 - ACKNOWLEDGEMENT -->
<p class="p-title">ACKNOWLEDGEMENT</p>
<p class="p-body">REPUBLIC OF THE PHILIPPINES)</p>
<p class="p-body">${c.place_of_notary || '______'} &hellip;&hellip;&hellip;&hellip;&hellip;.) SS.</p>
<p class="p-body">X&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;.)</p>
<p class="p-body" style="margin-top:8pt">Before Me, a Notary Public for and in <u>${c.place_of_notary || '______'}</u>, this ____________ day of ______________ ${year} personally appeared:</p>
<table style="width:85%;border-collapse:collapse;margin-top:10pt;font-size:10pt">
  <tr>
    <td style="padding:4pt 0;width:55%">&nbsp;</td>
    <td style="text-align:right;font-style:italic">Competent Evidence of Identity (CEI)</td>
  </tr>
  <tr>
    <td style="padding:4pt 0"><b>ROLYN C. DAGUIL, Ph.D.</b></td>
    <td style="text-align:right">ID. NO. M98-009</td>
  </tr>
  <tr>
    <td style="padding:4pt 0"><b>${name.toUpperCase()}</b></td>
    <td style="text-align:right">______________</td>
  </tr>
</table>
<p class="p-body" style="margin-top:10pt">,who</p>
<p class="p-body">______ is/are personally known to me</p>
<p class="p-body">______ exhibited (a) competent evidence/s of identity/ies as stated above</p>
<p class="p-body" style="margin-top:6pt">and known to me to be the same person/s who executed the foregoing instruments which consist of one (1) page sealed with my notarial seal and she/he/they acknowledged to me that his/her/their signature on the instrument was/were freely and voluntarily affixed by him/her/them for purposes stated therein.</p>
<p class="p-body">He/She/They further declared that he/she/they has/have the authority to sign in behalf of the principal that he/she/they represent(s).</p>
<p class="p-body"><b>WITNESS MY HAND AND SEAL</b> on the date and on the place first above mentioned.</p>
<table style="width:100%;margin-top:30pt;border-collapse:collapse">
  <tr>
    <td style="font-size:10pt;line-height:2;vertical-align:top">
      DOC. NO. &nbsp;______<br>
      PAGE NO. &nbsp;______<br>
      BOOK NO. &nbsp;______<br>
      SERIES OF &nbsp;______
    </td>
    <td style="text-align:center;vertical-align:bottom">
      <span style="border-top:1px solid #333;padding-top:2pt;font-weight:bold;font-size:10pt;display:inline-block;min-width:160pt">NOTARY PUBLIC</span>
    </td>
  </tr>
</table>

</body>
</html>`

  const blob = new Blob([html], { type: 'application/msword' })
  return blob
}
