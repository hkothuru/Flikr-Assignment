import React, { useState, useEffect } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'

const columns = [
    { field: 'id', headerName: 'id' },
    { field: 'year', headerName: 'year' },
    { field: 'category', headerName: 'category' },
    { field: 'firstname', headerName: 'firstname', width: 300 },
    { field: 'surname', headerName: 'surname', width: 300 },
    { field: 'motivation', headerName: 'motivation', width: 600 },
]

const DataTable = () => {

    const [tableData, setTableData] = useState([])

    useEffect(() => {
        fetch("http://api.nobelprize.org/v1/prize.json")
            .then((data) => data.json())
            .then((data) => {
                data = data.prizes
                let finalData = []
                let id = 1
                for (let i in data) {
                    // console.log(data[member])
                    for (let j in data[i].laureates) {
                        console.log(data[i].laureates[j])
                        finalData.push({
                            'id': id,
                            'year': data[i].year,
                            'category': data[i].category,
                            'firstname': data[i].laureates[j].firstname,
                            'surname': data[i].laureates[j].surname,
                            'motivation': data[i].laureates[j].motivation
                        })
                        id++
                    }
                }
                console.log(finalData)
                setTableData(finalData)
            })

    }, [])

    console.log(tableData)
    return (
        <div>
            <div style={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={tableData}
                    columns={columns}
                    pageSize={12}
                    components={{
                        Toolbar: GridToolbar,
                    }}
                />
            </div>
        </div>
    )
}

export default DataTable
