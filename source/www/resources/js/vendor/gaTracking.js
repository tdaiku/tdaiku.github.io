export default (target) => {
    target.addEventListener('click', (event) => {
        const tracking = event.currentTarget.dataset.tracking.split(',');

        gtag('event', tracking[1], {
            'event_category': tracking[0],
            'event_label': tracking[2]
        });
    });
};
