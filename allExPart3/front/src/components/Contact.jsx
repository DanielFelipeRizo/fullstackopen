const Contact = ({ contacts, strFilter, deleteContact }) => {
    //obtiene una lista de contactos que contienen el filtro, por nombre
    const contactsFilter = contacts.filter(c => c.name.toLowerCase().includes(strFilter.toLowerCase()))
    //console.log(contactsFilter);
    return(
        <div>
            {contactsFilter.map(c => <li key={c.id}> {c.name}: {c.number}
                <button onClick={() => deleteContact(c.id)}>delete</button> </li>)}
        </div>
    )
  }
  
  export default Contact