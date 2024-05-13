import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Grid, Typography} from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Order } from "../../app/models/order";
import { currencyFormat } from "../../app/util/util";
import BasketTable from "../basket/BasketTable";
import BasketSummary from "../basket/BasketSummary";
import { BasketItem } from "../../app/models/basket";

export default function Orders(){
    const [orders, setOrders] = useState<Order[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [orderDetails, setOrderDetails] = useState<Order | null>(null);
    const [showTable, setShowTable] = useState(true); // State to control table visibility
    
    useEffect(() => {
        setLoading(true);
        agent.Orders.list()
            .then(orders => setOrders(orders))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    },[])
    // const orderId = order.id;
    const handleViewOrderDetails = async (id: number) => {
        try {
            const orderDetails = await agent.Orders.fetch(id);
            setOrderDetails(orderDetails);
            setShowTable(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleBackToOrders = () => {
        setOrderDetails(null);
        setShowTable(true); // Show table on back to orders
    };

    const subtotal = orderDetails?.orderItems.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;

    if(loading) return <LoadingComponent message="Loading orders..."/>
    console.log(orders?.find(i => i.id == 1))

    return (
        <>
            {showTable && (<TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell>Order number</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Order Date</TableCell>
                <TableCell align="right">Order Status</TableCell>
                <TableCell align="right"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {orders?.map((order) => (
                <TableRow
                    key={order.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                    {order.id}
                    </TableCell>
                    <TableCell align="right">{currencyFormat(order.total)}</TableCell>
                    <TableCell align="right">{order.orderDate.split('T')[0]}</TableCell>
                    <TableCell align="right">{order.orderStatus}</TableCell>
                    <TableCell align="right">
                    <Button
                        variant="contained"
                        onClick={() => handleViewOrderDetails(order.id)}
                        >
                        View
                    </Button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
            </TableContainer>)}
            {orderDetails && (
                <>
                    <Typography variant="h6" gutterBottom>
                        <Grid container columnSpacing={4}>
                            <Grid item xs={10}>
                                Order #{orderDetails.id} - Pending
                            </Grid>
                            <Grid item xs={2}>
                                <Button fullWidth color="primary"  onClick={handleBackToOrders}>
                                    BACK TO ORDERS
                                </Button>
                            </Grid>
                        </Grid>
                    </Typography>
                    <BasketTable items={orderDetails.orderItems as BasketItem[]} isBasket={false}/>
                    <Grid container>
                        <Grid item xs={6} />
                        <Grid item xs={6}>
                            <BasketSummary subtotal={subtotal}/>
                        </Grid>
                    </Grid>
                </>
            )}
        </>
    )
}


// import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
// import { useEffect, useState } from "react";
// import agent from "../../app/api/agent";
// import LoadingComponent from "../../app/layout/LoadingComponent";
// import { Order } from "../../app/models/order";
// import { currencyFormat } from "../../app/util/util";
// import { Link } from "react-router-dom";

// export default function Orders(){
//     const [orders, setOrders] = useState<Order[] | null>(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         setLoading(true);
//         agent.Orders.list()
//             .then(orders => setOrders(orders))
//             .catch(error => console.log(error))
//             .finally(() => setLoading(false))
//     },[])

//     if(loading) return <LoadingComponent message="Loading orders..."/>

//     return (
//         <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//             <TableRow>
//             <TableCell>Order number</TableCell>
//             <TableCell align="right">Total</TableCell>
//             <TableCell align="right">Order Date</TableCell>
//             <TableCell align="right">Order Status</TableCell>
//             <TableCell align="right"></TableCell>
//             </TableRow>
//         </TableHead>
//         <TableBody>
//             {orders?.map((order) => (
//             <TableRow
//                 key={order.id}
//                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//                 <TableCell component="th" scope="row">
//                 {order.id}
//                 </TableCell>
//                 <TableCell align="right">{currencyFormat(order.total)}</TableCell>
//                 <TableCell align="right">{order.orderDate.split('T')[0]}</TableCell>
//                 <TableCell align="right">{order.orderStatus}</TableCell>
//                 <TableCell align="right">
//                 <Button
//                     component={Link}
//                     to={`/orderDetails/${order.id}`}
//                     variant="contained">
//                     View
//                 </Button>
//                 </TableCell>
//             </TableRow>
//             ))}
//         </TableBody>
//         </Table>
//     </TableContainer>
//     )
// }