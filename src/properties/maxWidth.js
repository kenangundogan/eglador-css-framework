export function generateMaxWidthClasses() {
    const classes = {};
    const maxWidthScale = ['0px','1px','0.125rem','0.25rem','0.375rem','0.5rem','0.625rem','0.75rem','0.875rem','1rem','1.25rem','1.5rem','1.75rem','2rem','2.25rem','2.5rem','2.75rem','3rem','3.5rem','4rem','5rem','6rem','7rem','8rem','9rem','10rem','11rem','12rem','13rem','14rem','15rem','16rem','18rem','20rem','24rem','none','20rem','24rem','28rem','32rem','36rem','42rem','48rem','56rem','64rem','72rem','80rem','100%','min-content','max-content','fit-content','65ch','640px','768px','1024px','1280px','1536px'];
    const maxWidthNames = ['0','px','0.5','1','1.5','2','2.5','3','3.5','4','5','6','7','8','9','10','11','12','14','16','20','24','28','32','36','40','44','48','52','56','60','64','72','80','96','none','xs','sm','md','lg','xl','2xl','3xl','4xl','5xl','6xl','7xl','full','min','max','fit','prose','screen-sm','screen-md','screen-lg','screen-xl','screen-2xl'];

    maxWidthScale.forEach((value, index) => {
        const remValue = `${value}`;
        classes[`max-w-${maxWidthNames[index]}`] = `max-width: ${remValue};`;
    });

    return classes;
}
