Ecwid.OnAPILoaded.add(function() {
console.log("Ecwid storefront JS API has loaded");
});

ec = ec || {}; 
ec.order = ec.order || {};
ec.order.extraFields = ec.order.extraFields || {};

Ecwid.OnCartChanged.add(function(cart) {
  var product = cart.items[0].product.id;
  if (product == '377069766') {

ec.order.extraFields.pickup_time_select = {
        'title': 'Select date of pickup',
        'required': true,
        'type': 'datetime',
        'checkoutDisplaySection': 'payment_details',
        'orderDetailsDisplaySection': 'order_comments',
        // Default date picker presets
        'datePickerOptions': {
            'minDate': new Date(new Date().getTime() + 2*60*60*1000), // Order is prepared for 2 hours minimum. Hiding 2 hours from the current time. Default is 0
            'maxDate': new Date(2021, 12, 31),
            'showTime': true,
            'incrementMinuteBy': 30,
            // limit available hours for each week day
            'limitAvailableHoursWeekly': {
                'MON': [
                    ['08:30', '13:30'],
                    ['14:00', '17:30']
                ],
                'TUE': [
                    ['14:00', '17:30']
                ],
                'WED': [
                    ['01:00', '13:30']
                ],
                'THU': [
                    ['14:00', '23:30']
                ],
                'FRI': [
                    ['14:00', '17:30']
                ]
            }
        }
};
Ecwid.refreshConfig();
} else {
    ec.order.extraFields.pickup_time_select = {
        'available': false
};
Ecwid.refreshConfig();
}
});