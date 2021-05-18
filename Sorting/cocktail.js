const cocktailSort= async(arr, n, delay=1)=>{
    await waitDelay(150);
    let st=0;
    let en=n-1;
    while (st<en)
    {
        for(let i=st;i<en;i++){

            arr[i].style.backgroundColor= "blue";
            arr[i+1].style.backgroundColor= "blue";

            if(parseInt(arr[i].style.height) > parseInt(arr[i+1].style.height))
                swap(arr[i], arr[i+1]);

            await waitDelay(delay);
            arr[i].style.backgroundColor= "red";
            arr[i+1].style.backgroundColor= "red";

        }

        arr[en].style.backgroundColor= "green";

        en--;

        for(let i=en;i>st;i--){

            arr[i].style.backgroundColor= "blue";
            arr[i-1].style.backgroundColor= "blue";

            if(parseInt(arr[i].style.height) < parseInt(arr[i-1].style.height))
                swap(arr[i], arr[i-1]);
            
            await waitDelay(delay);
            arr[i].style.backgroundColor= "red";
            arr[i-1].style.backgroundColor= "red";
        }

        arr[st].style.backgroundColor= "green";

        st++;
    }
}

const cocktail= async ()=>{
    const n=100, delay=0;
    const arr= generate(n);
    await cocktailSort(arr, n, delay);
}