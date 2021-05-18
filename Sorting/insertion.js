const insertionSort= async(arr, n, delay=1)=>{
    await waitDelay(150);
    let i, key, j;
    for (i = 1; i < n; i++)
    {
        key = arr[i].style.height;
        j = i - 1;
        arr[i].style.backgroundColor= "blue";
        await waitDelay(delay);
        while (j >= 0 && parseInt(arr[j].style.height) > parseInt(key))
        {   
            arr[j + 1].style.backgroundColor= "red";
            arr[j].style.backgroundColor= "blue";
            arr[j + 1].style.height = arr[j].style.height;
            j--;
            await waitDelay(delay);
        }
        arr[j + 1].style.backgroundColor= "red";
        arr[j + 1].style.height = key;
    }

    for(let i=n-1;i>=0;await waitDelay(delay),i--)
        arr[i].style.backgroundColor= "green";
}

const insertion= async ()=>{
    const n=100, delay=0;
    const arr= generate(n);
    await insertionSort(arr, n, delay);
}