const quick= async ()=>{
    const n=100, delay=2;
    const arr= generate(n);
    await waitDelay(150);

    const partition= async (low, high)=>{
        // console.log(low,high);
        let pivot = arr[high];
        pivot.style.backgroundColor= "blue";
        let i = (low - 1);
    
        for (let j = low; j <= high - 1; j++)
        {
            if (parseInt(arr[j].style.height) < parseInt(pivot.style.height))
            {
                i++;
                swap(arr[i], arr[j]);
                await waitDelay(delay);
            }
        }
        swap(arr[i + 1], arr[high]);
        arr[i+1].style.backgroundColor= "green";
        arr[high].style.backgroundColor= "red";
        return (i + 1);
    }

    const quickSort= async (low, high)=>{

        if (low < high)
        {
            let pi = await partition(low, high);
            await quickSort(low, pi - 1);
            await quickSort(pi + 1, high);
        }
    }

    await quickSort(0, n-1);
    for(let i=0;i<n;i++){
        arr[i].style.backgroundColor= "green";
        await waitDelay(1);
    }
}