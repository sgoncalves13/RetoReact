import React, { useState, useEffect } from 'react';

const CharactersList = () => {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState(''); 
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    
    const fetchCharacters = async () => {
        try {
          const query = new URLSearchParams({
            page: currentPage,
            name: search,
            gender: gender,
            status: status,
          });
          const url = `https://rickandmortyapi.com/api/character/?${query.toString()}`;
          const response = await fetch(url);
          const data = await response.json();
          setCharacters(data.results || []);
          setInfo(data.info || {});
        } catch (error) {
          console.error("Error fetching characters:", error);
          setCharacters([]);
          setInfo({});
        }
      };

    fetchCharacters();
  }, [currentPage, search, gender, status]); 

  
  const goToPrevPage = () => setCurrentPage((prev) => prev - 1);
  const goToNextPage = () => setCurrentPage((prev) => prev + 1);
  const handleSearchChange = (event) => {
    setSearch(event.target.value); 
    setCurrentPage(1); 
  };

  return (
    <div className="characters-list-container">
      <h2 className='titulo'>Personajes de Rick and Morty</h2>
      <input
        type="text"
        placeholder="Busca el nombre del personaje..."
        value={search}
        onChange={handleSearchChange}
        className="search-input"
      />
            <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="filter-select"
        >
        <option value="">Any Gender</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="genderless">Genderless</option>
        <option value="unknown">Unknown</option>
        </select>

        <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="filter-select"
        >
        <option value="">Any Status</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
        </select>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {characters.map((character) => (
          <div key={character.id} className="character-card">
            <img src={character.image} alt={character.name} />
            <h3>{character.name}</h3>
            <p>Status: {character.status}</p>
            <p>Species: {character.species}</p>
            <p>Gender: {character.gender}</p>
          </div>
        ))}
      </div>
      <div className="pagination-buttons">
        {info.prev && <button onClick={goToPrevPage}>Previous</button>}
        {info.next && <button onClick={goToNextPage}>Next</button>}
        <p>Page {currentPage} of {info.pages || 1}</p>
      </div>
    </div>
  );
};

export default CharactersList;
