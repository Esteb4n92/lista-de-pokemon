base_url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{}.png"
for id in range(1, 1026):  # Hay 1025 Pokémon en total
    print(base_url.format(id))