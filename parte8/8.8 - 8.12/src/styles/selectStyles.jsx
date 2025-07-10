
const customStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: 'white',
    borderColor: '#d1d5db', // tailwind: border-gray-300
    borderRadius: '0.5rem', // tailwind: rounded-lg
    padding: '0.25rem 0.5rem', // tailwind: p-1 px-2
    fontSize: '1rem', // tailwind: text-base
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#9ca3af', // tailwind: border-gray-400
    },
    width: '30%'
  }),
  menu: (base) => ({
    ...base,
    borderRadius: '0.5rem',
    padding: '0.25rem',
    fontSize: '0.95rem',
    zIndex: 50,
    width: '30%'
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? '#f3f4f6' : 'white', // tailwind: hover:bg-gray-100
    color: 'black',
    padding: '0.5rem',
    cursor: 'pointer',
  }),
}

export default customStyles;
