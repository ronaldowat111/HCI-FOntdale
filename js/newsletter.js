// ============================================================
//  FONTDALE — Newsletter form validation
//  Five JavaScript validations, implemented WITHOUT regular
//  expressions (only string methods, loops, and length checks).
// ============================================================
(function () {
  const form = document.getElementById('news-form');
  if (!form) return;

  const success = document.getElementById('form-success');

  // Show / clear an inline error message for a field.
  function setError(key, msg) {
    const out = document.getElementById('err-' + key);
    const field = document.getElementById(key);
    if (out) out.textContent = msg || '';
    if (field) field.classList.toggle('invalid', !!msg);
  }

  // ---------- helpers (no regex) ----------
  const DIGITS = '0123456789';
  const PHONE_CHARS = '0123456789 +-()';

  function isEmpty(v) {
    return v.trim().length === 0;
  }

  // Valid-looking email checked purely with indexOf / length.
  function isValidEmail(v) {
    v = v.trim();
    if (v.length < 5) return false;
    if (v.indexOf(' ') !== -1) return false;           // no spaces
    const at = v.indexOf('@');
    if (at < 1) return false;                            // '@' present and not first
    if (v.indexOf('@', at + 1) !== -1) return false;     // only one '@'
    const dot = v.indexOf('.', at + 2);                  // a '.' after "@x"
    if (dot === -1) return false;                        // domain must have a dot
    if (dot === v.length - 1) return false;              // must not end with '.'
    return true;
  }

  // True only if every character is an allowed phone character.
  function onlyPhoneChars(v) {
    for (let i = 0; i < v.length; i++) {
      if (PHONE_CHARS.indexOf(v[i]) === -1) return false;
    }
    return true;
  }

  // Count just the digit characters (ignores +, -, spaces, parentheses).
  function digitCount(v) {
    let count = 0;
    for (let i = 0; i < v.length; i++) {
      if (DIGITS.indexOf(v[i]) !== -1) count++;
    }
    return count;
  }

  // ---------- submit ----------
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let ok = true;
    success.hidden = true;

    // 1) Name — required and at least 3 characters
    const name = document.getElementById('name').value;
    if (isEmpty(name)) { setError('name', 'Please enter your name.'); ok = false; }
    else if (name.trim().length < 3) { setError('name', 'Name must be at least 3 characters.'); ok = false; }
    else setError('name', '');

    // 2) Email — required and well-formed (no regex)
    const email = document.getElementById('email').value;
    if (isEmpty(email)) { setError('email', 'Please enter your email.'); ok = false; }
    else if (!isValidEmail(email)) { setError('email', 'Enter a valid email, e.g. you@example.com.'); ok = false; }
    else setError('email', '');

    // 3) Phone — required, digits/format chars only, 8–15 digits
    const phone = document.getElementById('phone').value;
    if (isEmpty(phone)) { setError('phone', 'Please enter your phone number.'); ok = false; }
    else if (!onlyPhoneChars(phone)) { setError('phone', 'Phone number may contain digits only.'); ok = false; }
    else if (digitCount(phone) < 8 || digitCount(phone) > 15) { setError('phone', 'Phone number must be 8–15 digits.'); ok = false; }
    else setError('phone', '');

    // 4) Topic — an option must be chosen
    const topic = document.getElementById('topic').value;
    if (isEmpty(topic)) { setError('topic', 'Please choose a topic of interest.'); ok = false; }
    else setError('topic', '');

    // 5) Update preference — a frequency radio must be selected
    const freq = form.querySelector('input[name="frequency"]:checked');
    if (!freq) { setError('frequency', 'Please choose how often you want updates.'); ok = false; }
    else setError('frequency', '');

    if (ok) {
      form.reset();
      success.hidden = false;
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  // Clear a field's error as soon as the user edits it.
  function clearOnInteract(e) {
    const t = e.target;
    if (t.name === 'frequency') { setError('frequency', ''); return; }
    if (t.id) setError(t.id, '');
  }
  form.addEventListener('input', clearOnInteract);
  form.addEventListener('change', clearOnInteract);
})();
