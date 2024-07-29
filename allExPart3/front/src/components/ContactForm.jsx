const ContactForm = ({ addContact, newName, handleContactNameChange, newNumber, handleContactNumberChange, validateUniqueProperty }) => {

    return (
        <div>
            <form onSubmit={addContact}>
                <div>
                    name: <input value={newName}
                        onChange={handleContactNameChange}
                        style={{ borderColor: validateUniqueProperty('name', newName) ? '#fbdb94' : '' }}
                    />
                </div>
                <div>
                    number: <input value={newNumber}
                        onChange={handleContactNumberChange}
                        style={{ borderColor: validateUniqueProperty('number', newNumber) ? '#fbdb94' : '' }}
                    />

                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default ContactForm