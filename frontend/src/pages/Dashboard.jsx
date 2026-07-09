import Sidebar from "../components/Sidebar";

function Dashboard(){

    return(

        <div style={{display:"flex"}}>

            <Sidebar/>

            <main
                style={{
                    flex:1,
                    padding:"30px"
                }}
            >

                <h1>Dashboard</h1>

            </main>

        </div>

    );

}

export default Dashboard;
