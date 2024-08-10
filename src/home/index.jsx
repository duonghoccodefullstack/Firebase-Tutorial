import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword ,onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
// import { app } from '../firebase'
import { getDatabase, ref, set ,remove} from "firebase/database";
import axios from 'axios';
function Home() {
    const [nextId, setNextId] = useState(1);
    const firebaseConfig = {
        apiKey: "AIzaSyDxRV3ER5-2BCIwzbTT7sTcHh9HD-ap5Xs",
        authDomain: "movie-ticket-25-659ce.firebaseapp.com",
        databaseURL: "https://movie-ticket-25-659ce-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "movie-ticket-25-659ce",
        storageBucket: "movie-ticket-25-659ce.appspot.com",
        messagingSenderId: "599610268388",
        appId: "1:599610268388:web:86525e34a432b415286af1"
    };

    const app = initializeApp(firebaseConfig);
    // console.log(app);
    const auth = getAuth(app);
    const getData = getDatabase(app)

    const userRef =  ref(getData, `users/${nextId}`)
  

    const [states, setSate] = useState({
        username:"",
        age:"",
        id:0
    })
    const [data,setData] = useState([])
    const userData = {
        name: states.username,
        age: states.age
    };
    // const [state2, setSate2] = useState(10)
    // const nav = useNavigate()
    // const CLick = () => {
    //     nav('/contact', {
    //         state: {
    //             // key :"hello",
    //             index: states,
    //             data: state2
    //         }
    //     }
    //     )
    // }
    // const data = {
    //     email :prompt(),
    //     password:prompt()
    // }
    useEffect(() => {
        const fetchNextId = async () => {
            const userRef = ref( userData, 'users');
            const snapshot = await get(userRef);

            if (snapshot.exists()) {
                const data = snapshot.val(0);
                const ids = Object.keys(data).map(key => parseInt(key, 10));
                const maxId = Math.max(...ids);
                setNextId(maxId + 1);
            } else {
                setNextId(1);
            }
        };
        const GetFireBase = async () => {
            const dataJson = await axios.get("https://movie-ticket-25-659ce-default-rtdb.asia-southeast1.firebasedatabase.app/users/.json")
            console.log(dataJson.data);
            setData(dataJson.data)
            // console.log(data);
        }
        fetchNextId();
        GetFireBase()
    }, []);

    const handleClick = () => {
        // createUserWithEmailAndPassword(
        //     auth,
        //     "dbui@gmai.com", "DuonG@2k5"
        // ).then((value) => {
        //     setSate(value.user.email)
        //     console.log(value.user.email)
        //     alert("Done")
        //     // console.log(data);

        // })
        // hàm tạo dữ liệu 
        set(userRef, userData)
        .then(() => {
            console.log('Dữ liệu đã được ghi thành công');
            setNextId(nextId + 1);
           
            setSate({
                username:"",
                age:"",
            })
        })
        .catch((error) => {
            console.error('Lỗi khi ghi dữ liệu:', error);
        });
        // setSate(next => (next + 1))
        // setSate2(next => (next * 10))
           
    }
    // console.log(states); console.log(state2);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSate(prevData => ({
            ...prevData,
            [name]: value,  
        }));
      
    }
    // hàm xóa data base 
    const resetDatabase = async () => {
        try {
            const dbRef = ref(getData);
            await remove(dbRef); 
            console.log('Dữ liệu đã được xóa thành công');
        } catch (error) {
            console.error('Lỗi khi xóa dữ liệu:', error);
        }
    };
 
    
    return (
        <div>
            {/* <input></input> */}
            <input
            value={states.username}
            name='username'
            onChange={handleChange}
            ></input>
             <input
            value={states.age}
            name='age'
            onChange={handleChange}
            ></input>
            {/* <button onClick={CLick}>Click</button> */}

            <button  onClick={handleClick}>Click Create</button>
            <p>Json : </p>
            {data ? data.map((item) => (<p key={item}>name:{item.name}<br></br>age:{item.age}</p>)) : <p>no data</p>}
            {/* {data.lenght > 1 && data.map((item) => {
                console.log(item);
                
            })} */}
       
            <button onClick={resetDatabase}>Reset data base</button>
        </div>
    )
}

export default Home