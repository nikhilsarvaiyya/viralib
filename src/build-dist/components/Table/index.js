let setSort,setActivePage,setRowsPerPage,setfilters;
let prop = {};

function VRATable(props) {
    
    const { row } = props.children[1].props;
    const { column } = props.children[0].props;

    let activePage = prop?.setActivePage || 1
    let filters = {}
    let sort = { order: 'asc', orderBy: 'id' }
    let rowsPerPage = 3

    const filteredRows = useMyMemo(() => filterRows(row, filters), [row, filters]);
    const sortedRows = useMyMemo(() => sortRows(filteredRows, sort), [filteredRows, sort]);
    const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage);
    console.log("calculatedRows",calculatedRows,activePage)
    const count = filteredRows.length;
    const totalPages = Math.ceil(count / rowsPerPage);

    return (<div className="VRATable" >
        <Search {...props}/>
        {VRATableComponent({...props,calculatedRows})}
        {/* <VRATableComponent {...props} row={calculatedRows} column={column}  /> */}
        <div className="table-footer">
            {PageSelection({...props})}
            <VRATablePaginate {...props}  />
        </div>
    </div>);
}

function VRATableComponent(props) {
    console.log(props)
    
   
    const { column } = props.children[0].props;

    return <table ><VRATableHead column={column} /><VRATableBody row={props.calculatedRows} column={column} /></table>;
}

function VRATableHead(props) {
    console.log("VRATableHead",props)
    const { column } = props;
    let mapHead = column?.map((m, i) => {
        const sortIcon = () => { return "   " };
        return <th key={i}>{m.label} {sortIcon()}</th>;
    });
    return <thead><tr>{mapHead}</tr></thead>;
}

function VRATableBody(props) {
    console.log("VRATableBody",props)
    const { row, column } = props;
    let mapBody = row?.map((rowItem, i) => {
        return <tr>{column?.map((col, j) => { return <td key={i}>{rowItem[col.indexKey] || "NA"}</td> })}</tr>;
    });
    return <tbody>{mapBody}</tbody>;
}

function VRATablePaginate(props) {
    console.log("VRATablePaginate",props)
   let setActivePage;
   return <div className="pagination">
        <ul>
            <li>
                <button disabled={setActivePage === 1} onClick={() => {setActivePage = 3 ; VRATable({...props,setActivePage})}}>
                     First
                </button>
            </li>
            {/* <li>
                <button disabled={setActivePage === 1} onClick={() => VRATable({...props, ...--setActivePage})}>
                     PREV
                </button>
            </li>

            <li>
                <button disabled={setActivePage === totalPages} onClick={() => VRATable({...props, ...++setActivePage})}>
                    Next 
                </button>
            </li>
            <li>
                <button disabled={setActivePage === totalPages} onClick={() => setActivePage = totalPages}>
                    Last 
                </button>
            </li> */}
        </ul>
    </div>;
}

function PageSelection(props) {
    console.log("PageSelection",props)

    // const beginning = props?.setActivePage === 1 ? 1 : props?.setRowsPerPage * (props?.setActivePage - 1) + 1
    // const end = props?.setActivePage === props?.totalPages ? count : beginning + props?.setRowsPerPage - 1

    // let pages = page?.map((m, i) => { return <option key={i}>{m}</option> })
    return <div className="page-selection">
        <div>
            Page 
            {/* {props?.setActivePage} of {props?.totalPages} */}
        </div>
        <div>
            Rows: 
            {/* {beginning === end ? end : `${beginning} - ${end}`} of {count} */}
        </div>
        <div>Row Per Page &nbsp;
            <select>
                {/* {pages} */}
            </select>
        </div>
    </div>;
}

function Search(props) {
    return <div className="table-search"><input type="text" /></div>;
}


function useMyMemo(fn, dependencies) {
    let result = fn();
    let prevDependencies = dependencies;

    if (!dependencies.every((val, i) => val === prevDependencies[i])) {
        result = fn();
        prevDependencies = dependencies;
    }
    return result;
}


function isEmpty(obj = {}) {
    return Object.keys(obj).length === 0
}

function isString(value) {
    return typeof value === 'string' || value instanceof String
}

function isNumber(value) {
    return typeof value == 'number' && !isNaN(value)
}

function isBoolean(value) {
    return value === true || value === false
}

function isNil(value) {
    return typeof value === 'undefined' || value === null
}

function isDateString(value) {
    if (!isString(value)) return false

    return value.match(/^\d{2}-\d{2}-\d{4}$/)
}

function convertDateString(value) {
    return value.substr(6, 4) + value.substr(3, 2) + value.substr(0, 2)
}

function toLower(value) {
    if (isString(value)) {
        return value.toLowerCase()
    }
    return value
}

function convertType(value) {
    if (isNumber(value)) {
        return value.toString()
    }

    if (isDateString(value)) {
        return convertDateString(value)
    }

    if (isBoolean(value)) {
        return value ? '1' : '-1'
    }

    return value
}

function filterRows(rows, filters) {
    if (isEmpty(filters)) return rows

    return rows.filter((row) => {
        return Object.keys(filters).every((accessor) => {
            const value = row[accessor]
            const searchValue = filters[accessor]

            if (isString(value)) {
                return toLower(value).includes(toLower(searchValue))
            }

            if (isBoolean(value)) {
                return (searchValue === 'true' && value) || (searchValue === 'false' && !value)
            }

            if (isNumber(value)) {
                return value == searchValue
            }

            return false
        })
    })
}

function sortRows(rows, sort) {
    return rows.sort((a, b) => {
        const { order, orderBy } = sort

        if (isNil(a[orderBy])) return 1
        if (isNil(b[orderBy])) return -1

        const aLocale = convertType(a[orderBy])
        const bLocale = convertType(b[orderBy])

        if (order === 'asc') {
            return aLocale.localeCompare(bLocale, 'en', { numeric: isNumber(b[orderBy]) })
        } else {
            return bLocale.localeCompare(aLocale, 'en', { numeric: isNumber(a[orderBy]) })
        }
    })
}

function paginateRows(sortedRows, activePage, rowsPerPage) {
    return [...sortedRows].slice((activePage - 1) * rowsPerPage, activePage * rowsPerPage)
}


module.exports = { VRATable, VRATableHead, VRATableBody, VRATablePaginate };