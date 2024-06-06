$(document).ready(function () {
    function loadAllPage() {
        $('#map-container').css('width', '100%');
        $('#general-card').removeClass('d-none');
        $('#active-card').addClass('d-none');
        $('#details-card').addClass('d-none');
        $('#trip-history-card').addClass('d-none');
        $('#all').addClass('active');
        $('#active').removeClass('active');
    }

    function loadActivePage() {
        $('#map-container').css('width', '70%');
        setTimeout(() => {
            $('#general-card').addClass('d-none');
            $('#active-card').removeClass('d-none');
            $('#all').removeClass('active');
            $('#active').addClass('active');
        }, 1000);
    }

    function showDetails(element) {
        const machineNumber = element.querySelector('.machine-number').textContent;
        const data = fetchDataByMachineNumber(machineNumber);
        
        if (data) {
            const isActive = $(element).hasClass('active-machine-item');
            
            // Remove the active class from all machine items
            $('.machine-item').removeClass('active-machine-item');
            // Hide the details and trip history card
            $('#details-card').addClass('d-none');
            $('#trip-history-card').addClass('d-none');

            if (!isActive) {
                $(element).addClass('active-machine-item');

                $('#vehicle-number').text(`${data.machineNumber}`);
                $('#driver-name').text(`${data.driverName}`);
                $('#status').text(data.status);
                $('#passengers').text(data.passengers);
                $('#total-passengers').text(data.totalPassengers);
                $('#distance-travelled').text(`${data.distanceTravelled}km`);
                $('#expected-yield').text(`₦${Number(data.expectedYield).toLocaleString()}`);
                $('#current-location').text(data.currentLocation);

                // Update active class for status
                if (data.status === 'Active') {
                    $('#status').css({ 'border': '2px solid black', 'color': 'black' });
                } else {
                    $('#status').css({ 'border': '2px solid red', 'color': 'red' });
                }

                // Show the details and trip history card
                $('#details-card').removeClass('d-none');
                $('#trip-history-card').removeClass('d-none');
            }
        }
    }

    // Search functionality
    function searchMachines() {
        const query = $('#search').val().toLowerCase();
        $('.machine-item').each(function () {
            const machineNumber = $(this).find('.machine-number').text().toLowerCase();
            const location = $(this).find('.machine-location').text().toLowerCase();

            if (machineNumber.includes(query) || location.includes(query)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }
    

    $('#all').click(function () {
        loadAllPage();
        $('.machine-item').removeClass('active-machine-item');
    });

    $('#active').click(function () {
        loadActivePage();
    });

    $('.machine-item').click(function () {
        showDetails(this);
    });

    // Attach event listener to the search input
    $('#search').on('input', searchMachines);

    // Load initial page
    loadAllPage();
    updateTotals();
});