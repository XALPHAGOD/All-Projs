const selectionSort= async(arr, n, delay=1)=>{
    await waitDelay(150);
    for (let i = 0; i < n-1; i++) 
    {
        let min_idx = i;
        arr[min_idx].style.backgroundColor= "blue";
        for (let j = i+1; j < n; j++){
            arr[j].style.backgroundColor= "blue";
            await waitDelay(delay);
            if (parseInt(arr[j].style.height) < parseInt(arr[min_idx].style.height)){
                arr[min_idx].style.backgroundColor= "red";
                min_idx = j;
                arr[j].style.backgroundColor= "blue";
            }else{
                arr[j].style.backgroundColor= "red";
            }
        }

        swap(arr[min_idx], arr[i]);
        arr[min_idx].style.backgroundColor= "red";
        arr[i].style.backgroundColor= "green";
    }
    arr[n-1].style.backgroundColor= "green";
}

const selection= async ()=>{
    const n=100, delay=0;
    const arr= generate(n);
    await selectionSort(arr, n, delay);
}