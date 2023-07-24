function HeaderComponents(props){
    console.log(props);
    let sectionName = props.headerName;
    console.log(sectionName);

    return (
        <div>
            <h1>{sectionName}</h1>
        </div>
    )
}

export default HeaderComponents;