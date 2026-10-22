/* College enquiry knowledge base: each intent has example questions (patterns) and an answer.
   Answers give general, verifiable guidance. Exact college-specific figures (fees, cut-offs,
   dates) are deliberately not invented; the bot points students to the official source. */
window.KNOWLEDGE = [
  {
    id: "greeting", label: "Greeting",
    patterns: ["hi", "hello", "hey there", "good morning", "good evening", "hello is anyone there"],
    answer: "Hello! I'm the College Enquiry Assistant. Ask me about courses, admissions, fees, scholarships, placements, exams, hostel, library or campus facilities.",
  },
  {
    id: "courses", label: "Courses offered",
    patterns: ["what courses are offered", "which branches are available", "list of engineering courses",
      "do you have computer engineering", "is artificial intelligence and data science available", "what degree programmes can I study"],
    answer: "The college offers undergraduate B.E. (Bachelor of Engineering) programmes. Common branches at engineering colleges in Maharashtra include Computer Engineering, Information Technology, Electronics & Telecommunication, Mechanical, Civil, and newer branches such as AI & Data Science. Please check the official college website for the exact list of branches and intake for this year.",
  },
  {
    id: "admissions", label: "Admission process",
    patterns: ["how do I get admission", "what is the admission process", "how to apply for engineering",
      "admission procedure for first year", "when do admissions start", "how does cap round work"],
    answer: "First-year B.E. admissions in Maharashtra are handled centrally by the State Common Entrance Test (CET) Cell through the Centralized Admission Process (CAP). Steps: 1) appear for MHT-CET or JEE Main, 2) register on the CET Cell portal, 3) verify documents, 4) fill option forms in the CAP rounds, 5) report to the allotted college and confirm admission. Institute-level and management-quota seats follow the college's own notice.",
  },
  {
    id: "eligibility", label: "Eligibility",
    patterns: ["what is the eligibility for engineering", "am I eligible for admission", "minimum marks required in 12th",
      "which subjects are required in hsc", "eligibility criteria for be"],
    answer: "For first-year B.E., candidates generally need to pass HSC (Class 12) with Physics and Mathematics as compulsory subjects, plus one of Chemistry, Biotechnology, Biology, a technical vocational subject or Computer Science, with the minimum aggregate percentage set by the CET Cell for that year, and a valid MHT-CET or JEE Main score. Check the current year's CET Cell information brochure for the exact percentages and category-wise relaxation.",
  },
  {
    id: "entrance", label: "Entrance exams & cut-offs",
    patterns: ["which entrance exam is needed", "what is the cutoff percentile", "mht cet or jee main",
      "what rank do I need", "previous year cut off"],
    answer: "Admission is based on MHT-CET or JEE Main scores. Branch-wise cut-offs change every year and differ by category and CAP round, so I can't quote a reliable number. The State CET Cell publishes the official previous-year cut-off lists on its website, which is the best reference.",
  },
  {
    id: "documents", label: "Documents required",
    patterns: ["what documents are required for admission", "list of certificates needed", "which documents to carry for verification",
      "documents for cap round"],
    answer: "Typically required: SSC and HSC mark sheets, MHT-CET/JEE Main score card, leaving/transfer certificate, domicile or nationality certificate, Aadhaar card, passport-size photographs, and where applicable the caste certificate, caste validity, non-creamy layer and income certificates. Always follow the document checklist in the CET Cell notice for your category.",
  },
  {
    id: "fees", label: "Fees",
    patterns: ["what is the fee structure", "how much are the fees", "tuition fees for computer engineering",
      "fees per year", "can fees be paid in installments", "how to pay fees"],
    answer: "Fees for private unaided engineering colleges in Maharashtra are approved each year by the Fee Regulating Authority (FRA), so the amount depends on the academic year and your admission category. The approved fee structure is published on the college website and the FRA site. For payment modes and instalment options, please contact the college accounts office.",
  },
  {
    id: "scholarships", label: "Scholarships",
    patterns: ["are scholarships available", "how to apply for scholarship", "financial help for students",
      "government scholarship for engineering", "freeship for reserved category"],
    answer: "Eligible students can apply for Government of Maharashtra scholarships and freeships through the MahaDBT portal (mahadbt.maharashtra.gov.in), for example post-matric scholarships and the Rajarshi Chhatrapati Shahu Maharaj fee reimbursement scheme, subject to income and category criteria. Central schemes are available on the National Scholarship Portal. The college scholarship section helps with verification and document submission.",
  },
  {
    id: "placements", label: "Placements",
    patterns: ["how are the placements", "which companies come for placement", "what is the average package",
      "does the college provide jobs", "placement training", "training and placement cell"],
    answer: "The Training & Placement Cell organises aptitude and technical training, mock interviews and campus recruitment drives, usually from the final year. Recruiters and packages vary every year, so the most reliable figures are in the official placement report published by the college. Building projects, internships and coding skills early improves placement chances.",
  },
  {
    id: "internships", label: "Internships",
    patterns: ["are internships available", "how to get an internship", "is internship compulsory", "summer internship"],
    answer: "Internships are encouraged and are part of the curriculum under recent university syllabi. The placement cell shares internship openings, and students can also apply through platforms such as AICTE's internship portal. Check with your department for the credit and documentation requirements.",
  },
  {
    id: "examinations", label: "Examinations",
    patterns: ["how are exams conducted", "when are the semester exams", "what is the exam pattern",
      "internal assessment marks", "how is the result calculated", "kt or backlog exam"],
    answer: "Each semester has continuous internal assessment (class tests, assignments, practicals) and an end-semester university examination. The exam timetable and results are published by the university and shared by the college exam cell. For backlog (KT) exams, register for the next university examination session through the exam cell.",
  },
  {
    id: "attendance", label: "Attendance",
    patterns: ["what is the attendance requirement", "minimum attendance needed", "what happens if attendance is low"],
    answer: "Most universities require at least 75% attendance in each subject to be eligible for the end-semester examination. Medical or official leave must be supported by documents submitted to your class teacher or department. Exact rules are in the university ordinance and college handbook.",
  },
  {
    id: "accommodation", label: "Hostel",
    patterns: ["is hostel facility available", "hostel for girls", "hostel fees", "accommodation near college",
      "how to apply for hostel"],
    answer: "Hostel availability, capacity and charges differ by college and year. Please contact the college administration or check the website's hostel section for current availability and the application process. Many students also use nearby paying-guest accommodation.",
  },
  {
    id: "library", label: "Library",
    patterns: ["library timings", "can I borrow books", "is there a digital library", "how many books can I issue", "e journals access"],
    answer: "The college library provides textbooks, reference books, journals and digital resources, along with a reading area. Borrowing limits and timings are set by the library; your student ID card is needed to issue books. Ask at the library counter for e-journal login details.",
  },
  {
    id: "transport", label: "Transport & location",
    patterns: ["how to reach the college", "nearest railway station", "is college bus available", "college location", "travel to campus"],
    answer: "Directions and the nearest railway/bus stops are on the college website's contact page and on Google Maps. If the college runs bus services, routes and passes are managed by the administration office.",
  },
  {
    id: "timings", label: "College timings",
    patterns: ["what are the college timings", "when does college start", "office hours", "lecture timings"],
    answer: "Lecture timings are shared in each class timetable at the start of the semester. The administrative office usually works on weekdays during working hours; please confirm exact office hours on the college website before visiting.",
  },
  {
    id: "contact", label: "Contact",
    patterns: ["how to contact the college", "college phone number", "admission office email", "whom should I contact"],
    answer: "For official queries, use the phone numbers and email addresses listed on the college website's Contact page, or visit the admission office in person with your documents. For admission-process questions, the State CET Cell helpline is also available.",
  },
  {
    id: "clubs", label: "Clubs & events",
    patterns: ["are there student clubs", "technical events and fests", "cultural activities", "coding club", "how to join a club"],
    answer: "Students can join technical clubs, professional student chapters (such as IEEE, CSI or ACM), cultural and sports committees, and NSS. Clubs organise hackathons, workshops, and annual technical and cultural festivals. Announcements are made on department notice boards and student groups.",
  },
  {
    id: "sports", label: "Sports",
    patterns: ["sports facilities", "is there a gym", "inter college sports", "indoor games"],
    answer: "Sports activities include indoor and outdoor games and participation in inter-collegiate and university tournaments. Contact the sports department or physical education teacher for selection trials and facility timings.",
  },
  {
    id: "canteen", label: "Canteen",
    patterns: ["is there a canteen", "food on campus", "canteen timings"],
    answer: "Most campuses have a canteen serving snacks and meals during college hours. Ask at the administration office for timings and any meal-pass options.",
  },
  {
    id: "antiragging", label: "Anti-ragging",
    patterns: ["how to report ragging", "anti ragging committee", "is the campus safe", "ragging complaint"],
    answer: "Ragging is a punishable offence. Report it to the college Anti-Ragging Committee or squad, or call the UGC National Anti-Ragging Helpline 1800-180-5522 (toll-free, 24x7) or email helpline@antiragging.in. Every student also submits an anti-ragging undertaking at admission.",
  },
  {
    id: "thanks", label: "Thanks",
    patterns: ["thank you", "thanks a lot", "that was helpful", "thanks for the help"],
    answer: "You're welcome! Feel free to ask anything else about the college.",
  },
  {
    id: "goodbye", label: "Goodbye",
    patterns: ["bye", "goodbye", "see you later", "that is all"],
    answer: "Goodbye and all the best! Come back anytime you have more questions.",
  },
];

window.QUICK_TOPICS = [
  ["Courses", "What courses are offered?"],
  ["Admissions", "What is the admission process?"],
  ["Fees", "What is the fee structure?"],
  ["Scholarships", "How to apply for scholarship?"],
  ["Placements", "How are the placements?"],
  ["Exams", "How are exams conducted?"],
  ["Hostel", "Is hostel facility available?"],
  ["Documents", "What documents are required for admission?"],
];
