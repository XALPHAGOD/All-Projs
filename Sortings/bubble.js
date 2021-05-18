const bubbleSort= async(arr, n, delay=1)=>{
    await waitDelay(150);
    for (let i = 0; i < n-1; i++){
        for (let j = 0; j < n-1-i; j++){

            arr[j].style.backgroundColor= "blue";
            arr[j+1].style.backgroundColor= "blue";

            if(parseInt(arr[j].style.height) > parseInt(arr[j+1].style.height)){
                swap(arr[j], arr[j+1]);
            }
            await waitDelay(delay);
            arr[j].style.backgroundColor= "red";
            arr[j+1].style.backgroundColor= "red";

            if(j==n-2-i)
                arr[j+1].style.backgroundColor= "green";
        }
    }    
        arr[0].style.backgroundColor= "green";
}

const bubble= async ()=>{
    const n=100, delay=0;
    const arr= generate(n);
    await bubbleSort(arr, n, delay);
}