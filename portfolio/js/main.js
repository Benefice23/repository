/*
  main.js – Portfolio interactivity
  Marie Claire Uwimana | INES-Ruhengeri

  What this file does:
  1. Dark/light mode toggle
  2. Mobile hamburger menu
  3. Skill bar animations (runs when section is visible)
  4. GPA Calculator with validation
  5. Contact form validation
  6. Dynamic footer year
  7. Add/remove course rows in calculator
*/

// I'll use DOMContentLoaded so the script doesn't run before HTML is ready
document.addEventListener('DOMContentLoaded', function () {

  /* ============================================================
     1. DYNAMIC FOOTER YEAR
     One of the simplest DOM manipulations — just updating text
  ============================================================ */
  const footerYear = document.getElementById('footer-year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }


  /* ============================================================
     2. DARK / LIGHT MODE TOGGLE
  ============================================================ */
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon   = document.getElementById('theme-icon');
  const body        = document.body;

  // Check if user had a preference saved before
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'dark') {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    themeIcon.textContent = '☀️';
  }

  themeToggle.addEventListener('click', function () {
    const isDark = body.classList.contains('dark-mode');
    if (isDark) {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
      themeIcon.textContent = '🌙';
      localStorage.setItem('portfolio-theme', 'light');
    } else {
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
      themeIcon.textContent = '☀️';
      localStorage.setItem('portfolio-theme', 'dark');
    }
  });


  /* ============================================================
     3. MOBILE HAMBURGER MENU TOGGLE
  ============================================================ */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navLinks     = document.getElementById('nav-links');

  hamburgerBtn.addEventListener('click', function () {
    const isOpen = navLinks.classList.contains('open');
    navLinks.classList.toggle('open');
    hamburgerBtn.setAttribute('aria-expanded', !isOpen);
  });

  // Close menu when a nav link is clicked (good UX on mobile)
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    });
  });


  /* ============================================================
     4. SKILL BAR ANIMATION
     Uses IntersectionObserver so the bars animate when you
     scroll to the skills section — not on page load
  ============================================================ */
  const skillFills = document.querySelectorAll('.skill-fill');

  // IntersectionObserver is basically: "do this when element becomes visible"
  const skillObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.getAttribute('data-width');
        // small delay so it feels intentional
        setTimeout(function () {
          bar.style.width = targetWidth + '%';
        }, 150);
        // stop watching once it's animated
        skillObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  skillFills.forEach(function (bar) {
    skillObserver.observe(bar);
  });


  /* ============================================================
     5. GPA CALCULATOR
     Option A from the assignment
     
     Logic:
     - Each course has a mark out of 100 and credit weight
     - We convert each mark to GPA points (4-point scale)
     - Weighted average = sum(gpaPoints * credits) / sum(credits)
  ============================================================ */

  const coursesContainer = document.getElementById('courses-container');
  const addCourseBtn     = document.getElementById('add-course-btn');
  const calcGpaBtn       = document.getElementById('calc-gpa-btn');
  const resetCalcBtn     = document.getElementById('reset-calc-btn');
  const calcError        = document.getElementById('calc-error');
  const calcResult       = document.getElementById('calc-result');

  // keep track of how many rows we have added
  let rowCounter = 3; // started with 3 rows in HTML

  /* --- Helper: convert a percentage mark to GPA points --- */
  function markToGPA(mark) {
    if (mark >= 75) return 4.0;
    if (mark >= 65) return 3.0;
    if (mark >= 55) return 2.0;
    if (mark >= 45) return 1.0;
    return 0.0;
  }

  /* --- Helper: GPA to classification text --- */
  function getClassification(gpa) {
    if (gpa >= 3.5) return 'Distinction';
    if (gpa >= 2.5) return 'Merit';
    if (gpa >= 1.5) return 'Credit';
    if (gpa >= 1.0) return 'Pass';
    return 'Fail';
  }

  /* --- Add a new course row --- */
  addCourseBtn.addEventListener('click', function () {
    // limit to 10 courses, that's already a lot
    if (rowCounter >= 10) {
      showCalcError('Maximum of 10 courses reached.');
      return;
    }
    rowCounter++;
    const newRow = document.createElement('div');
    newRow.className = 'course-row';
    newRow.setAttribute('data-row', rowCounter);
    newRow.innerHTML =
      '<label for="course-name-' + rowCounter + '" class="sr-only">Course Name</label>' +
      '<input type="text" id="course-name-' + rowCounter + '" class="course-name" placeholder="Course name" maxlength="40" />' +
      '<label for="course-mark-' + rowCounter + '" class="sr-only">Mark out of 100</label>' +
      '<input type="number" id="course-mark-' + rowCounter + '" class="course-mark" placeholder="Mark /100" min="0" max="100" />' +
      '<label for="course-credits-' + rowCounter + '" class="sr-only">Credits</label>' +
      '<input type="number" id="course-credits-' + rowCounter + '" class="course-credits" placeholder="Credits" min="1" max="20" value="20" />' +
      '<button class="btn-remove-row" aria-label="Remove this course row" title="Remove">✕</button>';
    coursesContainer.appendChild(newRow);
    clearCalcError();
    // focus the new course name input
    newRow.querySelector('.course-name').focus();
  });

  /* --- Remove a course row (event delegation) --- */
  coursesContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-remove-row')) {
      const row = e.target.closest('.course-row');
      const allRows = coursesContainer.querySelectorAll('.course-row');
      // must keep at least 1 row
      if (allRows.length <= 1) {
        showCalcError('You need at least one course.');
        return;
      }
      row.remove();
      clearCalcError();
    }
  });

  /* --- Calculate GPA --- */
  calcGpaBtn.addEventListener('click', function () {
    clearCalcError();
    calcResult.hidden = true;

    const rows = coursesContainer.querySelectorAll('.course-row');
    let isValid  = true;
    let courses  = [];

    rows.forEach(function (row) {
      const nameInput    = row.querySelector('.course-name');
      const markInput    = row.querySelector('.course-mark');
      const creditsInput = row.querySelector('.course-credits');

      const name    = nameInput.value.trim();
      const markStr = markInput.value.trim();
      const credits = parseFloat(creditsInput.value);

      // reset any old error styling
      nameInput.classList.remove('error');
      markInput.classList.remove('error');
      creditsInput.classList.remove('error');

      // Validate name
      if (name === '') {
        nameInput.classList.add('error');
        isValid = false;
      }

      // Validate mark
      if (markStr === '' || isNaN(parseFloat(markStr))) {
        markInput.classList.add('error');
        isValid = false;
      } else {
        const mark = parseFloat(markStr);
        if (mark < 0 || mark > 100) {
          markInput.classList.add('error');
          isValid = false;
        }
      }

      // Validate credits
      if (isNaN(credits) || credits < 1 || credits > 20) {
        creditsInput.classList.add('error');
        isValid = false;
      }

      if (isValid || (name !== '' && markStr !== '')) {
        // only push if mark is valid number, we'll check isValid below
        if (!isNaN(parseFloat(markStr)) && parseFloat(markStr) >= 0 && parseFloat(markStr) <= 100 && !isNaN(credits)) {
          courses.push({
            name:    name,
            mark:    parseFloat(markStr),
            credits: credits
          });
        }
      }
    });

    if (!isValid) {
      showCalcError('Please fill in all fields correctly. Marks must be 0–100, credits 1–20.');
      return;
    }

    if (courses.length === 0) {
      showCalcError('No valid courses found. Please check your inputs.');
      return;
    }

    // weighted GPA calculation
    let totalWeightedGPA = 0;
    let totalCredits     = 0;
    let totalWeightedPct = 0;

    courses.forEach(function (course) {
      const gpaPoints = markToGPA(course.mark);
      totalWeightedGPA += gpaPoints * course.credits;
      totalWeightedPct += course.mark * course.credits;
      totalCredits     += course.credits;
    });

    const finalGPA = totalWeightedGPA / totalCredits;
    const finalPct = totalWeightedPct / totalCredits;
    const classification = getClassification(finalGPA);

    // update result DOM
    document.getElementById('gpa-value').textContent    = finalGPA.toFixed(2);
    document.getElementById('pct-value').textContent    = finalPct.toFixed(1) + '%';
    document.getElementById('class-value').textContent  = classification;
    document.getElementById('credits-value').textContent = totalCredits;

    // show the result
    calcResult.hidden = false;
    calcResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  /* --- Reset calculator --- */
  resetCalcBtn.addEventListener('click', function () {
    // remove all rows except the first
    const rows = coursesContainer.querySelectorAll('.course-row');
    rows.forEach(function (row, idx) {
      if (idx === 0) {
        // clear the first row inputs
        row.querySelectorAll('input').forEach(function (inp) {
          if (inp.type === 'number' && inp.classList.contains('course-credits')) {
            inp.value = 3;
          } else {
            inp.value = '';
          }
          inp.classList.remove('error');
        });
      } else {
        row.remove();
      }
    });
    rowCounter = 1;
    clearCalcError();
    calcResult.hidden = true;
  });

  function showCalcError(msg) {
    calcError.textContent = msg;
  }
  function clearCalcError() {
    calcError.textContent = '';
  }


  /* ============================================================
     6. CONTACT FORM VALIDATION
  ============================================================ */
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // don't actually submit – no backend

    let formValid = true;

    // helper to show/clear errors
    function setFieldError(fieldId, errorId, message) {
      const field = document.getElementById(fieldId);
      const error = document.getElementById(errorId);
      if (message) {
        field.classList.add('error');
        error.textContent = message;
        formValid = false;
      } else {
        field.classList.remove('error');
        error.textContent = '';
      }
    }

    // --- Name ---
    const nameVal = document.getElementById('sender-name').value.trim();
    if (nameVal.length < 2) {
      setFieldError('sender-name', 'name-error', 'Please enter your name (at least 2 characters).');
    } else {
      setFieldError('sender-name', 'name-error', '');
    }

    // --- Email ---
    const emailVal = document.getElementById('sender-email').value.trim();
    // simple email check – not perfect but works for frontend validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailVal)) {
      setFieldError('sender-email', 'email-error', 'Please enter a valid email address.');
    } else {
      setFieldError('sender-email', 'email-error', '');
    }

    // --- Subject ---
    const subjectVal = document.getElementById('sender-subject').value.trim();
    if (subjectVal.length < 3) {
      setFieldError('sender-subject', 'subject-error', 'Subject is too short — please be more specific.');
    } else {
      setFieldError('sender-subject', 'subject-error', '');
    }

    // --- Message ---
    const messageVal = document.getElementById('sender-message').value.trim();
    if (messageVal.length < 10) {
      setFieldError('sender-message', 'message-error', 'Message is too short — please write at least a sentence.');
    } else {
      setFieldError('sender-message', 'message-error', '');
    }

    if (formValid) {
      // show success message, hide submit button
      formSuccess.hidden = false;
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      contactForm.querySelector('button[type="submit"]').disabled = true;
      contactForm.querySelector('button[type="submit"]').textContent = 'Sent ✓';
    }
  });

  // clear error on input change – better UX
  contactForm.querySelectorAll('input, textarea').forEach(function (field) {
    field.addEventListener('input', function () {
      field.classList.remove('error');
    });
  });


  /* ============================================================
     7. ACTIVE NAV LINK HIGHLIGHTING
     Updates the active link as user scrolls through sections
  ============================================================ */
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const navObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(function (a) {
          a.style.color = '';
          a.style.fontWeight = '';
          if (a.getAttribute('href') === '#' + id) {
            a.style.color = 'var(--clr-accent)';
            a.style.fontWeight = '700';
          }
        });
      }
    });
  }, {
    threshold: 0.4,
    rootMargin: '-64px 0px 0px 0px'
  });

  sections.forEach(function (section) {
    navObserver.observe(section);
  });

 /* ===== 8. CV DOWNLOAD (Print) ===== */
const downloadCVBtn = document.getElementById('downloadCV');
if (downloadCVBtn) {
  downloadCVBtn.addEventListener('click', () => {
    const cvElem = document.getElementById('cvPreview');
    if (!cvElem) { 
      window.print(); 
      return; 
    }

    // Clone the CV content and remove the photo container to avoid duplication
    const cvContent = cvElem.cloneNode(true);
    const photoContainer = cvContent.querySelector('.cv-photo-container');
    if (photoContainer) {
      photoContainer.remove();
    }
    
    // Remove the duplicate header section from the cloned content
    const headerSection = cvContent.querySelector('.cv-header');
    if (headerSection) {
      headerSection.remove();
    }

    // Create professional CV with profile photo
    const printWindow = window.open('', '_blank');
    
    // Build comprehensive CV HTML with professional styling
    const cvHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Benefice Izibyose - CV</title>
        <style>
          /* ===== RESET & BASE ===== */
          * { 
            box-sizing: border-box; 
            margin: 0; 
            padding: 0; 
          }
          
          html { 
            font-size: 16px; 
          }
          
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; 
            color: #2c3e50; 
            background: white;
            padding: 40px 50px; 
            font-size: 12px;
            line-height: 1.6;
          }
          
          /* ===== CV HEADER SECTION ===== */
          .cv-header {
            display: flex;
            gap: 35px;
            align-items: flex-start;
            padding-bottom: 28px;
            border-bottom: 3px solid #2c5f7f;
            margin-bottom: 32px;
            position: relative;
          }
          
          .cv-header::after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 0;
            width: 60px;
            height: 4px;
            background: linear-gradient(90deg, #2c5f7f, #5ba3c7);
            border-radius: 2px;
          }
          
          /* Profile Photo */
          .cv-photo {
            flex-shrink: 0;
          }
          
          .cv-photo img {
            width: 130px;
            height: 130px;
            border-radius: 8px;
            object-fit: cover;
            border: 3px solid #2c5f7f;
            box-shadow: 0 6px 20px rgba(44, 95, 127, 0.15);
            display: block;
          }
          
          /* Name & Title Block */
          .cv-name-block {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-top: 8px;
          }
          
          .cv-name-block h2 {
            font-family: -apple-system, BlinkMacSystemFont, Georgia, serif;
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 6px;
            color: #2c5f7f;
            letter-spacing: -0.5px;
          }
          
          .cv-name-block p {
            color: #555;
            font-size: 13px;
            margin: 4px 0;
            line-height: 1.5;
            font-weight: 500;
          }
          
          .cv-name-block p:first-of-type {
            color: #2c5f7f;
            font-weight: 600;
            font-size: 14px;
          }
          
          /* Contact Information Block */
          .cv-contact-block {
            text-align: right;
            font-size: 11px;
            color: #666;
            line-height: 1.9;
            display: flex;
            flex-direction: column;
            gap: 3px;
          }
          
          .cv-contact-block p {
            margin: 0;
            font-size: 11px;
          }
          
          /* ===== CONTENT SECTIONS ===== */
          h3 {
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 1.2px;
            color: #2c5f7f;
            margin: 20px 0 12px 0;
            padding-bottom: 8px;
            border-bottom: 2px solid #e0e8f0;
            font-weight: 700;
          }
          
          h4 {
            font-size: 12px;
            color: #2c5f7f;
            font-weight: 600;
            margin-bottom: 3px;
          }
          
          /* ===== CV BODY LAYOUT ===== */
          .cv-body { 
            display: grid; 
            grid-template-columns: 1.5fr 1.2fr; 
            gap: 35px;
          }
          
          .cv-section {
            page-break-inside: avoid;
          }
          
          .cv-section h4 {
            display: none;
          }
          
          /* ===== CV ENTRIES ===== */
          .cv-entry { 
            margin-bottom: 14px;
            page-break-inside: avoid;
          }
          
          .cv-entry strong { 
            display: block; 
            font-size: 12px; 
            margin-bottom: 3px; 
            color: #2c5f7f;
            font-weight: 600;
          }
          
          .cv-entry p { 
            font-size: 11px; 
            color: #666; 
            margin: 3px 0; 
            line-height: 1.5; 
          }
          
          .cv-date { 
            font-size: 10px; 
            color: #999; 
            font-weight: 700; 
            display: block; 
            margin-bottom: 3px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          /* ===== TEXT & CONTENT ===== */
          .cv-section p {
            font-size: 11px;
            color: #666;
            line-height: 1.6;
            margin-bottom: 8px;
          }
          
          /* Skill Tags */
          .cv-skills-list { 
            display: flex; 
            flex-wrap: wrap; 
            gap: 6px; 
            margin-top: 8px; 
          }
          
          .cv-skills-list span { 
            font-size: 10px; 
            padding: 5px 10px; 
            background: #e8f1f8; 
            color: #2c5f7f; 
            border-radius: 12px;
            border: 1px solid #d0dce8;
            font-weight: 500;
          }
          
          /* Lists */
          ul { 
            margin-left: 16px;
            padding: 0;
          }
          
          li { 
            font-size: 11px; 
            color: #666; 
            margin-bottom: 5px; 
            line-height: 1.5;
            page-break-inside: avoid;
          }
          
          .section-container {
            page-break-inside: avoid;
          }
          
          /* ===== PRINT STYLES ===== */
          @media print {
            body { 
              background: white; 
              padding: 40px 50px;
            }
            .cv-header {
              page-break-inside: avoid;
            }
          }
        </style>
      </head>
      <body>
        <div class="cv-header">
          <div class="cv-photo">
            <img src="assets/images/me.jpg" alt="Profile Photo">
          </div>
          <div class="cv-name-block">
            <h2>Bénéfice Izibyose Rochelo</h2>
            <p>Frontend Developer & Computer Science Student</p>
            <p>INES-Ruhengeri · Musanze, Rwanda</p>
          </div>
          <div class="cv-contact-block">
            <p><strong style="color: #2c5f7f; font-weight: 600;">CONTACT</strong></p>
            <p>📧 beneficeizibyose5@gmail.com</p>
            <p>📱 +250 782 833 532</p>
            <p>🌐 benefice.portfolio.com</p>
            <p>📍 Musanze, Rwanda</p>
          </div>
        </div>
        
        <div class="cv-body">
          ${cvContent.innerHTML}
        </div>
      </body>
      </html>
    `;
    
    printWindow.document.write(cvHTML);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); }, 300);
  });
}







}); // end DOMContentLoaded