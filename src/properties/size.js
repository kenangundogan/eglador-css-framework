export function generateSizeClasses() {
    const classes = {};
    const sizeScale = ['0px','1px','0.125rem','0.25rem','0.375rem','0.5rem','0.625rem','0.75rem','0.875rem','1rem','1.25rem','1.5rem','1.75rem','2rem','2.25rem','2.5rem','2.75rem','3rem','3.5rem','4rem','5rem','6rem','7rem','8rem','9rem','10rem','11rem','12rem','13rem','14rem','15rem','16rem','18rem','20rem','24rem','auto','50%','33.333333%','66.666667%','25%','50%','75%','20%','40%','60%','80%','16.666667%','33.333333%','50%','66.666667%','83.333333%','8.333333%','16.666667%','25%','33.333333%','41.666667%','50%','58.333333%','66.666667%','75%','83.333333%','91.666667%','100%','min-content','max-content','fit-content'];
    const sizeNames = ['size-0','size-px','size-0.5','size-1','size-1.5','size-2','size-2.5','size-3','size-3.5','size-4','size-5','size-6','size-7','size-8','size-9','size-10','size-11','size-12','size-14','size-16','size-20','size-24','size-28','size-32','size-36','size-40','size-44','size-48','size-52','size-56','size-60','size-64','size-72','size-80','size-96','size-auto','size-1/2','size-1/3','size-2/3','size-1/4','size-2/4','size-3/4','size-1/5','size-2/5','size-3/5','size-4/5','size-1/6','size-2/6','size-3/6','size-4/6','size-5/6','size-1/12','size-2/12','size-3/12','size-4/12','size-5/12','size-6/12','size-7/12','size-8/12','size-9/12','size-10/12','size-11/12','size-full','size-min','size-max','size-fit'];

    sizeScale.forEach((value, index) => {
        const remValue = `${value}`;
        classes[sizeNames[index]] = `width: ${remValue}; height: ${remValue};`;
    });

    return classes;
}
