function skillsMember() {
  $('.skills').each(function() {
    var $this = $(this),
        $progressBar = $this.find('.skills-progress .progress-bar'),
        $value = $this.find('.skills-value');

    $progressBar.css('width', $value.text());
  });
}