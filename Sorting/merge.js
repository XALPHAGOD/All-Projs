const merge= async ()=>{
    const n=100, delay=2;
    const arr= generate(n);
    await waitDelay(150);

    const merging= async (l, m, r)=>{
        let n1 = m - l + 1;
        let n2 = r - m;
        let L= [];
        let R= [];
        let newArr= [];
    
        for (let i = 0; i < n1; i++)
            L.push(arr[l + i].style.height);
    
        for (let j = 0; j < n2; j++)
            R.push(arr[m + 1 + j].style.height);
    
        let i = 0;
        let j = 0;

        while (i < n1 && j < n2) {

            if (parseInt(L[i]) <= parseInt(R[j]))
                newArr.push(L[i++]);
            else
                newArr.push(R[j++]);

        }

        while (i < n1)
            newArr.push(L[i++]);

        while (j < n2)
            newArr.push(R[j++]);
        
        for(let x=l;x<=r;x++){
            arr[x].style.height= newArr[x-l];
            await waitDelay(delay);
        }

    }
    
    const mergePartition= async (l,r)=>{
        if(l>=r)
            return;
        let m =l+ parseInt((r-l)/2);
        await mergePartition(l,m);
        await mergePartition(m+1,r);
        await merging(l,m,r);
    }

    await mergePartition(0, n - 1);
    for(let i=0;i<n;i++){
        arr[i].style.backgroundColor= "green";
        await waitDelay(0);
    }
}