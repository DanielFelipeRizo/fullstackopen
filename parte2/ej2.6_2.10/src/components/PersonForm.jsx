const PersonForm = ({ addContact, newName, handleContactNameChange, newNumber, handleContactNumberChange, validateUniqueProperty }) => {

    return (
        <div>
            <form onSubmit={addContact}>
                <div>
                    name: <input value={newName}
                        onChange={handleContactNameChange}
                        style={{ borderColor: validateUniqueProperty('name', newName) ? 'red' : '' }}
                    />
                </div>
                <div>
                    number: <input value={newNumber}
                        onChange={handleContactNumberChange}
                        style={{ borderColor: validateUniqueProperty('number', newNumber) ? 'red' : '' }}
                    />

                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm