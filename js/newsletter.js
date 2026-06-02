// Validasi form newsletter (tanpa regex)
(function(){
  const form = document.getElementById('news-form');
  if(!form) return;

  const success = document.getElementById('form-success');

  function setError(key, msg){
    const out = document.getElementById('err-' + key);
    const field = document.getElementById(key);
    if(out) out.textContent = msg || '';
    if(field) field.classList.toggle('invalid', !!msg);
  }

  const digits = '0123456789';
  const phoneChars = '0123456789 +-()';

  function isEmpty(v){
    return v.trim().length === 0;
  }

  function isValidEmail(v){
    v = v.trim();
    if(v.length < 5) return false;
    if(v.indexOf(' ') !== -1) return false;
    const at = v.indexOf('@');
    if(at < 1) return false;
    if(v.indexOf('@', at + 1) !== -1) return false;
    const dot = v.indexOf('.', at + 2);
    if(dot === -1 || dot === v.length - 1) return false;
    return true;
  }

  function onlyPhoneChars(v){
    for(let i = 0; i < v.length; i++){
      if(phoneChars.indexOf(v[i]) === -1) return false;
    }
    return true;
  }

  function digitCount(v){
    let n = 0;
    for(let i = 0; i < v.length; i++){
      if(digits.indexOf(v[i]) !== -1) n++;
    }
    return n;
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    let ok = true;
    success.hidden = true;

    const name = document.getElementById('name').value;
    if(isEmpty(name)){
      setError('name', 'Please enter your name.');
      ok = false;
    } else if(name.trim().length < 3){
      setError('name', 'Name must be at least 3 characters.');
      ok = false;
    } else {
      setError('name', '');
    }

    const email = document.getElementById('email').value;
    if(isEmpty(email)){
      setError('email', 'Please enter your email.');
      ok = false;
    } else if(!isValidEmail(email)){
      setError('email', 'Enter a valid email, e.g. you@example.com.');
      ok = false;
    } else {
      setError('email', '');
    }

    const phone = document.getElementById('phone').value;
    if(isEmpty(phone)){
      setError('phone', 'Please enter your phone number.');
      ok = false;
    } 
    else if(!onlyPhoneChars(phone)){
      setError('phone', 'Phone number may contain digits only.');
      ok = false;
    } 
    else if(digitCount(phone) < 8 || digitCount(phone) > 15){
      setError('phone', 'Phone number must be 8–15 digits.');
      ok = false;
    } 
    else{
      setError('phone', '');
    }

    const topicEl = document.getElementById('topic');
    if(topicEl){
      if(isEmpty(topicEl.value)){
        setError('topic', 'Please choose a topic of interest.');
        ok = false;
      } 
      else 
        {
        setError('topic', '');
      }
    }

    if(form.querySelector('input[name="frequency"]')){
      const freq = form.querySelector('input[name="frequency"]:checked');
      if(!freq){
        setError('frequency', 'Please choose how often you want updates.');
        ok = false;
      } 
      else{
        setError('frequency', '');
      }
    }

    if(ok){
      form.reset();
      success.hidden = false;
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  // Hapus pesan error 
  function clearError(e){
    const t = e.target;
    if(t.name === 'frequency'){
      setError('frequency', '');
    } else if(t.id){
      setError(t.id, '');
    }
  }

  form.addEventListener('input', clearError);
  form.addEventListener('change', clearError);
})();
