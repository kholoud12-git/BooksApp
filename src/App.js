import './App.css';
import React, {useEffect, useState} from "react";
import Axios from 'axios';
function App() {

  const [id, setId] = useState("")
  const [Name, setName] = useState("")
  const [Publisher, setPublisher] = useState("")
  const [Publish_Date, setPublish_Date] = useState("")
  const [Type, setType] = useState("")
  const [newBook, setNewBook] = useState("")
  const [NewPublisher, setNewPublisher] = useState("")
  const [NewPublish_Date, setNewPublish_Date] = useState("")
  const [NewType, setNewType] = useState("")
  const [BookList, setBookList] = useState([])

  const getBooks =() => {
    Axios.get('http://localhost:3002/api/get').then((response)=>{
      setBookList(response.data)
    }).catch(err => console.log(err))
  };

  // useEffect(() => {
  //   Axios.get('http://localhost:3002/api/get').then((response)=>{
  //     setBookList(response.data)
  //   }).catch(err => console.log(err))
  // }, []);

  const submitReview = () =>{
    Axios.post('http://localhost:3002/api/insert', {id:id, Name:Name, Publisher:Publisher, Publish_Date: Publish_Date, Type:Type});
    setBookList([
      ...BookList,
      {Name:Name,Publisher:Publisher,Publish_Date:Publish_Date, Type:Type}
    ])
  }

  const deleteBook = (book) => {
    Axios.delete(`http://localhost:3002/api/delete/${book}`);
    console.log(book)
  }

  const updateBook = (id) => {
    Axios.put("http://localhost:3002/api/update", {
      Name:newBook,
      Publisher : NewPublisher,
      Publish_Date : NewPublish_Date,
      Type: NewType,
      id:id
    }).then((response) => {
      setBookList(BookList.map((val)=>{
        return val.id === id ? {
          id:val.id,
          Name:newBook,
          Publisher : NewPublisher,
          Publish_Date : NewPublish_Date,
          Type: NewType,

        } : val 
      }))
    });
  
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Book Store</h1>
        <div className='form'>  
        
          <table className='form-page'>
            <tr>
              <td>
                 <label>id</label>
              </td>
              <td>
                <input type='number' placeholder='Enter id' name="id" onChange={(e)=>{setId(e.target.value)}}/>
              </td>
            </tr>
            <tr>
              <td><label>BookName</label></td>
              <td>
                <input type='text' placeholder='Enter Book Name' name="Name" onChange={(e)=>{
                  setName(e.target.value)}}/>
             </td>
            </tr>
            <tr>
              <td><label>Publisher Name</label></td>
              <td>
                <input type='text' placeholder='Enter Publisher Name' name="Publisher" onChange={(e)=>{
                  setPublisher(e.target.value)
                  }}/>
              </td>
            </tr>
            <tr>
              <td><label>Publish Date</label></td>
              <td>
                <input type='date' placeholder='Enter Publish Date' name="Publish_Date" onChange={(e)=>{
                   setPublish_Date(e.target.value)
                   }}/> 
              </td>
            </tr>
            <tr>
              <td><label>Type</label></td>
              <td>
                <input type='text' placeholder='Enter Type' name="Type" onChange={(e)=>{
                setType(e.target.value)
                }}/>
              </td>
            </tr>
            <tr>
              <td colspan="2"><button onClick={submitReview} className='submit'>Submit</button></td>
            </tr>
           
          </table>
          <button onClick={getBooks} className='allbook'>Display All Books</button>
           {BookList.map((val) => {
              return(<div className='books'>
                 <div>
                   <h3>{val.Name}</h3>
                   <p> <span>Publisher</span><strong>{val.Publisher}</strong></p>
                   <p><span>Type</span><strong>{val.Type}</strong></p>
                   <p><span>Published</span> <strong>{val.Publish_Date}</strong></p>
                   <button onClick={() =>{deleteBook(val.id)}} className='deUp'>Delete</button>
                 </div>
                 <table className='showbook'>
                   <tr>
                     <td>
                       <p>BookName</p>
                     </td>
                     <td>
                       <input type='text' placeholder={val.Name} onChange={(e) => {setNewBook(e.target.value)}} />
                     </td>
                   </tr>
                   <tr>
                     <td>
                       <p>Publisher</p>
                     </td>
                     <td>
                       <input type='text' placeholder={val.Publisher} onChange={(e) => {setNewPublisher(e.target.value)}} />
                     </td>
                   </tr>
                   <tr>
                     <td>
                       <p>Publish_Date</p>
                     </td>
                     <td>
                       <input type='date' placeholder={val.Publish_Date} onChange={(e) => {setNewPublish_Date(e.target.value)}} />
                     </td>
                   </tr>
                   <tr>
                     <p>Type</p>
                     <td> 
                        <input type='text' placeholder={val.Type} onChange={(e) => {setNewType(e.target.value)}} />
                      </td>
                   </tr>
                   <tr>
                     <td colspan='2'> <button onClick={() => {updateBook(val.id)}} className='deUpdate'>Update</button></td>
                   </tr>
                 </table>
            </div>)
           })}
         </div>
      </header>
    </div>
  );
}

export default App;
