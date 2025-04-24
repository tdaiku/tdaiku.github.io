import $ from 'jquery';

export default ($target) => {
    $target.on('click', (event) => {
        const target = $(event.currentTarget);
        const tracking = target.data('tracking').split(',');

        gtag('event', tracking[1], {'event_category': tracking[0],'event_label': tracking[2]} );
    });
};
