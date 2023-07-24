function FooterComponents(props){
    console.log(props);
    let footerName = props.footerName;
    console.log(footerName);

    return (
        <div>
            <h1>{footerName}</h1>
        </div>
    )
}

export default FooterComponents;