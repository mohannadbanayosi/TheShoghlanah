function PusherNotifier(channel, options) {
  options = options || {};
  this.settings = {
    eventName: 'notification',
    title: '',
    titleEventProperty: 'the_title', // if set the 'title' will not be used and the title will be taken from the event
    image: 'http://localhost:8000/static/img/notify.png',
    eventTextProperty: 'message',
    name: 'name',
    link: 'link',
    translated: 'translated',
    the_title_translated: 'the_title_translated',
    gritterOptions: {}
  };
  
  $.extend(this.settings, options);
  
  var self = this;
  channel.bind(this.settings.eventName, function(data){ self._handleNotification(data); });
};
PusherNotifier.prototype._handleNotification = function(data) {
  var gritterOptions = {
   title: (this.settings.titleEventProperty? data[this.settings.titleEventProperty] : this.settings.title),
   text: data[this.settings.eventTextProperty].replace(/\\/g, ''),
   image: this.settings.image,
   name: data[this.settings.name],
   link: data[this.settings.link],
   translated: data[this.settings.translated],
   the_title_translated: data[this.settings.the_title_translated]
  };
  
  $.extend(gritterOptions, this.settings.gritterOptions);
  
  $.gritter.add(gritterOptions);
};
