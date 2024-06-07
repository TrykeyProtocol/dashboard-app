// fetch.js

// Predefined arrays for mock data
const machineNumbers = ['RJ14CV0002', 'RJ14CV0003', 'RJ14CV0004', 'RJ14CV0005', 'RJ14CV0006', 'RJ14CV0007', 'RJ14CV0008', 'RJ14CV0009', 'RJ14CV0010', 'RJ14CV0011'];
const totalPassengers = [2, 4, 1, 3, 3, 23, 20, 24, 26, 17];
const distancesTravelled = ['12', '22', '3', '15', '18', '110', '90', '115', '130', '85'];
const expectedYields = ['20000', '23000', '4200', '19000', '21000', '23000', '17000', '24000', '25000', '16000'];
const currentLocations = ['Maitama, Abuja', 'Asokoro, Abuja', 'Wuse, Abuja', 'Gwarinpa, Abuja', 'Wuye, Abuja', 'Wuse, Abuja', 'Garki, Abuja', 'Maitama, Abuja', 'Gwarimpa, Abuja', 'Wuse, Abuja'];
const statuses = ['Inactive', 'Inactive', 'Active', 'Active', 'Active', 'Inactive', 'Active', 'Inactive', 'Active', 'Inactive'];
const passengers = [3, 4, 2, 5, 1, 3, 6, 2, 4, 3];
const driverNames = ['Awomakou Simeon', 'Chukwudi Obinna', 'Ademola Adewale', 'Ngozi Okeke', 'Amina Yusuf', 'Ifeanyi Nwachukwu', 'Kehinde Olayinka', 'Emeka Eze', 'Fatima Bello', 'Yusuf Abdullahi'];

// Function to fetch data
function fetchData(index) {
    return {
        machineNumber: machineNumbers[index],
        totalPassengers: totalPassengers[index],
        distanceTravelled: distancesTravelled[index],
        expectedYield: expectedYields[index],
        currentLocation: currentLocations[index],
        status: statuses[index],
        passengers: passengers[index],
        driverName: driverNames[index]
    };
}

// Function to fetch data by machine number
function fetchDataByMachineNumber(machineNumber) {
    const index = machineNumbers.indexOf(machineNumber);
    if (index !== -1) {
        return fetchData(index);
    } else {
        console.error('Machine number not found');
        return null;
    }
}

// Function to create machine items and append them to the container
function createMachineItems() {
    const container = document.querySelector('.machine-list');

    machineNumbers.forEach((machineNumber, index) => {
        const data = fetchData(index);

        const machineItem = document.createElement('div');
        machineItem.className = 'machine-item pl-3 py-4 m-2 mb-3';

        const table = document.createElement('table');
        const tbody = document.createElement('tbody');
        const tr = document.createElement('tr');

        const tdIcon = document.createElement('td');
        tdIcon.className = 'material-icons';
        tdIcon.textContent = 'electric_rickshaw';

        const tdDetails = document.createElement('td');
        tdDetails.className = 'machine-details mx-3';

        const h6 = document.createElement('h5');
        h6.className = 'machine-number';
        h6.textContent = data.machineNumber;

        const divIconText = document.createElement('div');
        divIconText.className = 'icon-text';

        const spanLocationIcon = document.createElement('span');
        spanLocationIcon.className = 'material-icons';
        spanLocationIcon.style.color = 'darkred';
        spanLocationIcon.textContent = 'location_on';

        const spanLocation = document.createElement('span');
        spanLocation.className = 'machine-location';
        spanLocation.textContent = data.currentLocation;

        divIconText.appendChild(spanLocationIcon);
        divIconText.appendChild(spanLocation);

        tdDetails.appendChild(h6);
        tdDetails.appendChild(divIconText);

        const tdRate = document.createElement('td');
        tdRate.className = 'machine-rate pr-2';
        tdRate.innerHTML = `<span class="yield">₦${Math.ceil(data.expectedYield/data.distanceTravelled)}</span><span class="mileage">/km</span>`;

        tr.appendChild(tdIcon);
        tr.appendChild(tdDetails);
        tr.appendChild(tdRate);

        tbody.appendChild(tr);
        table.appendChild(tbody);

        machineItem.appendChild(table);
        container.appendChild(machineItem);
    });
}

// Call the function to create machine items when the script loads
document.addEventListener('DOMContentLoaded', createMachineItems);


// Function to calculate totals and update the UI
function updateTotals() {

    // Total number of machines
    const totalMachines = machineNumbers.length;

    // Total number of active machines
    const activeMachines = statuses.filter(status => status === 'Active').length;

    // Total expected yield
    const totalYield = expectedYields.reduce((sum, yieldValue) => {
        // Extract the numeric part from the string and convert to integer;
        return sum + Number(yieldValue);
    }, 0);

    // Update the DOM
    document.getElementById('machine-total').textContent = totalMachines;
    document.getElementById('active-machine-total').textContent = activeMachines;
    document.getElementById('yield-total').textContent = `₦${totalYield.toLocaleString()}`;
}

// Call updateTotals when the document is ready
$(document).ready(function () {
    updateTotals();
});
