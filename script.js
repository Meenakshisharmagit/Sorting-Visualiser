let array = [];
let size = 40;
let delay = 60;

const primary = "#6C63FF";
const compare = "#FFB6C1";
const swap = "#FFD166";
const sorted = "#06D6A0";

const sizeSlider = document.getElementById("sizeSlider");
const speedSlider = document.getElementById("speedSlider");

sizeSlider.oninput = function () {
    size = this.value;
    generateArray();
};

speedSlider.oninput = function () {
    delay = 210 - this.value;
};

function generateArray() {
    array = [];
    const container = document.getElementById("array");
    container.innerHTML = "";
    for (let i = 0; i < size; i++) {
        let value = Math.floor(Math.random() * 350) + 20;
        array.push(value);
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = value + "px";
        bar.style.width = (800 / size) + "px";
        container.appendChild(bar);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < size - 1; i++) {
        for (let j = 0; j < size - i - 1; j++) {
            bars[j].style.backgroundColor = compare;
            bars[j + 1].style.backgroundColor = compare;
            await sleep(delay);
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                bars[j].style.height = array[j] + "px";
                bars[j + 1].style.height = array[j + 1] + "px";
            }
            bars[j].style.backgroundColor = primary;
            bars[j + 1].style.backgroundColor = primary;
        }
        bars[size - i - 1].style.backgroundColor = sorted;
    }
}

async function insertionSort() {
    let bars = document.getElementsByClassName("bar");
    for (let i = 1; i < size; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            bars[j].style.backgroundColor = swap;
            array[j + 1] = array[j];
            bars[j + 1].style.height = array[j] + "px";
            j--;
            await sleep(delay);
        }
        array[j + 1] = key;
        bars[j + 1].style.height = key + "px";
    }
    for (let i = 0; i < size; i++) {
        bars[i].style.backgroundColor = sorted;
    }
}

async function selectionSort() {
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < size; i++) {
        let min = i;
        for (let j = i + 1; j < size; j++) {
            bars[j].style.backgroundColor = compare;
            await sleep(delay);
            if (array[j] < array[min]) min = j;
            bars[j].style.backgroundColor = primary;
        }
        [array[i], array[min]] = [array[min], array[i]];
        bars[i].style.height = array[i] + "px";
        bars[min].style.height = array[min] + "px";
        bars[i].style.backgroundColor = sorted;
    }
}

async function mergeSortWrapper() {
    await mergeSort(0, size - 1);
    document.querySelectorAll(".bar").forEach(bar => bar.style.backgroundColor = sorted);
}

async function mergeSort(l, r) {
    if (l >= r) return;
    let m = Math.floor((l + r) / 2);
    await mergeSort(l, m);
    await mergeSort(m + 1, r);
    await merge(l, m, r);
}

async function merge(l, m, r) {
    let bars = document.getElementsByClassName("bar");
    let left = array.slice(l, m + 1);
    let right = array.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;
    while (i < left.length && j < right.length) {
        bars[k].style.backgroundColor = compare;
        await sleep(delay);
        if (left[i] <= right[j]) array[k++] = left[i++];
        else array[k++] = right[j++];
        bars[k - 1].style.height = array[k - 1] + "px";
        bars[k - 1].style.backgroundColor = primary;
    }
    while (i < left.length) {
        array[k] = left[i];
        bars[k++].style.height = left[i++] + "px";
        await sleep(delay);
    }
    while (j < right.length) {
        array[k] = right[j];
        bars[k++].style.height = right[j++] + "px";
        await sleep(delay);
    }
}

async function quickSortWrapper() {
    await quickSort(0, size - 1);
    document.querySelectorAll(".bar").forEach(bar => bar.style.backgroundColor = sorted);
}

async function quickSort(low, high) {
    if (low < high) {
        let pi = await partition(low, high);
        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
    }
}

async function partition(low, high) {
    let bars = document.getElementsByClassName("bar");
    let pivot = array[high];
    bars[high].style.backgroundColor = swap;
    let i = low - 1;
    for (let j = low; j < high; j++) {
        bars[j].style.backgroundColor = compare;
        await sleep(delay);
        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            bars[i].style.height = array[i] + "px";
            bars[j].style.height = array[j] + "px";
        }
        bars[j].style.backgroundColor = primary;
    }
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    bars[i + 1].style.height = array[i + 1] + "px";
    bars[high].style.height = array[high] + "px";
    return i + 1;
}

generateArray();