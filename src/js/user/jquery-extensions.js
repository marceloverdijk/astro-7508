$.fn.choices = function() { 
  return this.get(0).choices
}

$.fn.flatpickr = function() { 
  return this.get(0)._flatpickr
}

$.fn.noUiSlider = function() { 
  return this.get(0).noUiSlider
}

$.fn.reset = function() {
  this.each(function() {
    const $this = $(this)
    // Order is important: choices, flatpickr, noUiSlider, :checkbox, :radio, input, select
    if ($this.choices()) {
      $this.choices().setChoiceByValue('')
    } else if ($this.flatpickr()) {
      $this.flatpickr().clear()
    } else if ($this.noUiSlider()) {
      $this.noUiSlider().reset()
    } else if ($this.is(':checkbox') || $this.is(':radio')) {
      const defaultChecked = $this.prop('defaultChecked') || false
      $this.prop('checked', defaultChecked)
      $this.get(0).dispatchEvent(new Event('change'))
    } else if ($this.is('input')) {
      const defaultValue = $this.prop('defaultValue') || ''
      $this.val(defaultValue)
      $this.get(0).dispatchEvent(new Event('change'))
    } else if ($this.is('select')) {
      $this.find('option').prop('selected', function() {
        return $(this).prop('defaultSelected')
      })
      $this.get(0).dispatchEvent(new Event('change'))
    }
  })
}

$.fn.valAsBoolean = function() {
  return this.val().toLowerCase() === 'true'
}

$.fn.valAsNumber = function() {
  return Number(this.val())
}

$($('.form-contol-required')).on('blur', function() {
  if ($(this).val() === '') {
      $(this).reset()
      $(this).get(0).dispatchEvent(new Event('input'))
  } 
})
