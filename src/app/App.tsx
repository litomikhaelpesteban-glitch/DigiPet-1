import { useState } from 'react';

type PetType =  | 'cat'  | 'dog'  | 'bunny'  | 'hamster'  | 'bird'  | 'hedgehog'  | 'guineapig';
type Screen = 'home' | 'adopt' | 'accessory' | 'pet-room' | 'view-pet' | 'edit-accessory';
type Theme = 'pink' | 'blue' | 'gray';

interface Pet {
  name: string;
  type: PetType;
  color: string;
  status: 'happy' | 'hungry' | 'dirty';
  coins: number;
  breed?: string; 
  accessories?: string[];
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [theme, setTheme] = useState<Theme>('pink');
  const [pet, setPet] = useState<Pet | null>(null);
  const [petName, setPetName] = useState("");
  const [selectedPetType, setSelectedPetType] = useState("");
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedAccessories, setSelectedAccessories]
  = useState<string[]>([]);
  const toggleAccessory = (item: string) => {

  // REMOVE if already selected
  if (selectedAccessories.includes(item)) {

    setSelectedAccessories(
      selectedAccessories.filter(
        (a) => a !== item
      )
    );

    return;
  }

  // LIMIT TO 2
  if (selectedAccessories.length >= 2) {
    return;
  }

  // BLOCK RIBBON + FLOWER
  if (
    (item === "Ribbon" &&
      selectedAccessories.includes("Flower"))

    ||

    (item === "Flower" &&
      selectedAccessories.includes("Ribbon"))
  ) {
    return;
  }

  // ADD
  setSelectedAccessories([
    ...selectedAccessories,
    item
  ]);
};

//   const toggleAccessory = (item: string) => {

//   if (
//     selectedAccessories.includes(item)
//   ) {

//     setSelectedAccessories(
//       selectedAccessories.filter(
//         (a) => a !== item
//       )
//     );

//   } else {

//     setSelectedAccessories([
//       ...selectedAccessories,
//       item
//     ]);
//   }
// };

      
      const accessories = {
        dog: ["Ribbon", "Glasses", "Flower"],
        cat: ["Ribbon", "Glasses", "Flower"],
        bunny: ["Ribbon", "Glasses", "Flower"],
        hamster: ["Ribbon", "Glasses", "Flower"],
        bird: ["Ribbon", "Glasses", "Flower"],
        hedgehog: ["Ribbon", "Glasses", "Flower"],
        guineapig: ["Ribbon", "Glasses", "Flower"]
      };

      //BREEDS DATA  
      const breeds = {
        dog: [
          "Golden Retriever",
          "German Shephered",
          "French Bulldog",
          "Poodle"
        ],
        cat: [
          "Persian",
          "Siamese",
          "Maine Coon",
          "British Shorthair"
        ],
        bunny: [
          "Holland Lop",
          "Netherland Dwarf",
          "Mini Rex",
          "Lionhead"
        ],
        Hamster: [
          "Syrian Hamster",
          "Dwarf Hamster - Campbell",
          "Dwarf Hamster - Winter White",
          "Roborovski Hamster",
          "Chinese Hamster"
        ],
        Bird: [
          "Budgerigar (Parakeet)",
          "Cockatiel",
          "Lovebird",
          "Canary"
        ],
        Hedgehog: [
          "African Pygmy Hedgehog - salt and pepper",
          "African Pygmy Hedgehog - brown",
          "African Pygmy Hedgehog - white"
        ],
        GuineaPig: [  
          "American Guinea Pig",
          "Abyssinian Guinea Pig",
          "Peruvian Guinea Pig",
          "Silkie Guinea Pig"
        ]
      };

  const themes = {
    pink: {
      primary: '#FFB4D5',
      primaryHover: '#FF9BC5',
      secondary: '#FFF0F5',
      accent: '#FFE5F0',
      text: '#8B4567',
      border: '#FFD4E5'
    },
    blue: {
      primary: '#A8D8FF',
      primaryHover: '#8FC8EF',
      secondary: '#F0F8FF',
      accent: '#E0F0FF',
      text: '#3A5F7D',
      border: '#C8E4FF'
    },
    gray: {
      primary: '#C4C4D4',
      primaryHover: '#B0B0C0',
      secondary: '#F8F8FA',
      accent: '#E8E8EE',
      text: '#5A5A6A',
      border: '#D8D8E4'
    }
  };

  const currentTheme = themes[theme];

  // const petEmojis: Record<PetType, string> = {
  //   cat: '🐱',
  //   dog: '🐶',
  //   bunny: '🐰'
  // };

  const colors = ['Brown', 'White', 'Black', 'Gray', 'Orange'];
  
  const handleAdoptPet = () => {
    if (petName && selectedPetType) {
      setPet({
        name: petName,
        type: selectedPetType as PetType,
        color: selectedColor,
        status: 'happy',
        coins: 0
      });
      setCurrentScreen('accessory');
    }
  };

  const feedPet = () => {
    if (pet) {
      setPet({ ...pet, status: 'happy', coins: pet.coins + 10 });
    }
  };

  const cleanPet = () => {
    if (pet) {
      setPet({ ...pet, status: 'happy', coins: pet.coins + 10 });
    }
  };

  const playWithPet = () => {
    if (pet) {
      setPet({ ...pet, status: 'happy', coins: pet.coins + 15 });
    }
  };

  const playGame = () => {
    if (pet) {
      setPet({ ...pet, coins: pet.coins + 50 });
      alert('🎮 Game completed! +50 coins!');
    }
  };

  // THEME SELECTOR
  const ThemeSelector = () => (
    <div className="fixed top-4 right-4 flex gap-2 z-50">
      <button
        onClick={() => setTheme('pink')}
        className="w-8 h-8 rounded-full bg-[#FFB4D5] border-2 border-white shadow-md hover:scale-110 transition-transform"
      />
      <button
        onClick={() => setTheme('blue')}
        className="w-8 h-8 rounded-full bg-[#A8D8FF] border-2 border-white shadow-md hover:scale-110 transition-transform"
      />
      <button
        onClick={() => setTheme('gray')}
        className="w-8 h-8 rounded-full bg-[#C4C4D4] border-2 border-white shadow-md hover:scale-110 transition-transform"
      />
    </div>
  );

  // 1. HOME SCREEN
  if (currentScreen === 'home') {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
        style={{ backgroundColor: currentTheme.secondary }}
      >
        <ThemeSelector />
        <div className="w-full max-w-sm md:max-w-md lg:max-w-lg">
          <div
            className="rounded-3xl p-8 md:p-10 shadow-2xl text-center"
            style={{ backgroundColor: 'white' }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ color: currentTheme.text }}>
              Digipet 
            </h1>
            <p className="text-lg md:text-xl mb-8" style={{ color: currentTheme.text, opacity: 0.7 }}>
              Bring your best friend, anywhere, everywhere 
            </p>
            <div className="mb-8 flex justify-center">
              <div
                className="w-40 h-40 md:w-48 md:h-48 rounded-3xl shadow-lg flex items-center justify-center"
                style={{ backgroundColor: currentTheme.accent }}
              >
                <div className="text-7xl md:text-8xl">
                  <img 
                    src="/maindog.png" 
                    alt="pet" 
                    className="w-32 md:w-40 mx-auto"
                  />
                </div>

                <div className="text-7xl md:text-8xl"></div>
              </div>
            </div>
            <div className="space-y-4">
              <button
                onClick={() => setCurrentScreen('adopt')}
                className="w-full py-4 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all text-lg"
                style={{ backgroundColor: currentTheme.primary }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = currentTheme.primaryHover}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = currentTheme.primary}
              >
                Adopt a Pet
              </button>
              <button
                onClick={() => pet && setCurrentScreen('pet-room')}
                disabled={!pet}
                className="w-full py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: 'white',
                  color: currentTheme.primary,
                  border: `2px solid ${currentTheme.primary}`
                }}
              >
                View My Pet
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. ADOPT PET SCREEN
  if (currentScreen === 'adopt') {
    const petImages = {
            cat: "/pets/adoptcat.png",
            dog: "/pets/adoptdog.png",
            bunny: "/pets/adoptbunny.png",
            hamster: "/pets/adopthamster.png",
            bird: "/pets/adoptbird.png",
            hedgehog: "/pets/adopthedgehog.png",
            guineapig: "/pets/adoptguineapig.png" 
    };

    return (
      <div
        className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
        style={{ backgroundColor: currentTheme.secondary }}
      >
        <ThemeSelector />
        <div className="w-full max-w-sm md:max-w-md lg:max-w-lg">
          <div
            className="rounded-3xl p-8 md:p-10 shadow-2xl relative"
            style={{ backgroundColor: 'white' }}
          >
            <button
              onClick={() => setCurrentScreen('home')}
              className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all hover:scale-105"
              style={{
                backgroundColor: currentTheme.secondary,
                color: currentTheme.text
              }}
            >
              ← Back
            </button>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center" style={{ color: currentTheme.text }}>
              Adopt a Pet
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block mb-2 font-semibold" style={{ color: currentTheme.text }}>
                  Pet Name
                </label>
                <input
                  type="text"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  placeholder="Enter your pets name..."
                  className="w-full px-4 py-3 rounded-2xl focus:outline-none transition-all"
                  style={{
                    backgroundColor: currentTheme.secondary,
                    border: `2px solid ${currentTheme.border}`,
                    color: currentTheme.text
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = currentTheme.primary}
                  onBlur={(e) => e.currentTarget.style.borderColor = currentTheme.border}
                />
              </div>

              <div>
                <label className="block mb-3 font-semibold" style={{ color: currentTheme.text }}>
                  Which pet?
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['cat', 'dog', 'bunny', 'hamster', 'bird', 'hedgehog', 'guineapig'] as PetType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedPetType(type)}
                      className="p-6 rounded-2xl shadow-md hover:shadow-lg transition-all"
                      style={{
                        backgroundColor: selectedPetType === type ? currentTheme.primary : 'white',
                        border: `2px solid ${selectedPetType === type ? currentTheme.primary : currentTheme.border}`
                      }}
                    >
                <div className="mb-2">
                  <img
                    src={petImages[type]}
                    alt={type}
                    className="w-16 h-16 object-contain mx-auto"
                  />
                </div>
                      <p
                        className="text-sm font-medium capitalize"
                        style={{ color: selectedPetType === type ? 'white' : currentTheme.text }}
                      >
                        {type}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* <div>
                <label className="block mb-3 font-semibold" style={{ color: currentTheme.text }}>
                  Choose Color (Optional)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className="py-3 px-2 rounded-xl shadow-sm hover:shadow-md transition-all text-sm"
                      style={{
                        backgroundColor: selectedColor === color ? currentTheme.primary : currentTheme.secondary,
                        color: selectedColor === color ? 'white' : currentTheme.text,
                        border: `1px solid ${currentTheme.border}`
                      }}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div> */}

              <div className="pt-4">
                <button
                  onClick={handleAdoptPet}
                  disabled={!petName || !selectedPetType}
                  className="w-full py-4 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: currentTheme.primary }}
                  onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = currentTheme.primaryHover)}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = currentTheme.primary}
                >
                  Adopt
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

//   // 3. BREED SCREEN
// if (currentScreen === 'breed') {
//   const currentBreeds = breeds[selectedPetType as keyof typeof breeds];

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
//       style={{ backgroundColor: currentTheme.secondary }}
//     >
//       <ThemeSelector />

//       <div className="w-full max-w-sm md:max-w-md lg:max-w-lg">
//         <div
//           className="rounded-3xl p-8 md:p-10 shadow-2xl relative"
//           style={{ backgroundColor: 'white' }}
//         >

//           {/* BACK BUTTON */}
//           <button
//             onClick={() => setCurrentScreen('adopt')}
//             className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all hover:scale-105"
//             style={{
//               backgroundColor: currentTheme.secondary,
//               color: currentTheme.text
//             }}
//           >
//             ← Back
//           </button>

//           <h2
//             className="text-3xl md:text-4xl font-bold mb-8 text-center"
//             style={{ color: currentTheme.text }}
//           >
//             Choose a Breed
//           </h2>

//           {/* BREED GRID */}
//           <div className="grid grid-cols-3 gap-3">
//             {currentBreeds.map((breed) => (
//               <button
//                 key={breed}
//                 onClick={() => setSelectedBreed(breed)}
//                 className="p-4 rounded-2xl shadow-md hover:shadow-lg transition-all text-sm"
//                 style={{
//                   backgroundColor:
//                     selectedBreed === breed
//                       ? currentTheme.primary
//                       : "white",
//                   color:
//                     selectedBreed === breed
//                       ? "white"
//                       : currentTheme.text,
//                   border: `2px solid ${
//                     selectedBreed === breed
//                       ? currentTheme.primary
//                       : currentTheme.border
//                   }`,
//                 }}
//               >
//                 {breed}
//               </button>
//             ))}
//           </div>

//           {/* CONTINUE BUTTON */}
//           <div className="pt-6">
//             <button
//               onClick={() => {
//                 setPet({
//                   name: petName,
//                   type: selectedPetType as PetType,
//                   color: '',
//                   status: 'happy',
//                   coins: 0,
//                   breed: selectedBreed
//                 });

//                 setCurrentScreen('accessory');
//               }}
//               disabled={!selectedBreed}
//               className="w-full py-4 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed"
//               style={{ backgroundColor: currentTheme.primary }}
//               onMouseEnter={(e) =>
//                 !e.currentTarget.disabled &&
//                 (e.currentTarget.style.backgroundColor = currentTheme.primaryHover)
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.backgroundColor = currentTheme.primary)
//               }
//             >
//               Continue
//             </button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

// 4. ACCESSORY SCREEN
if (currentScreen === 'accessory') {

  const currentAccessories =
    accessories[selectedPetType as keyof typeof accessories];

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      style={{ backgroundColor: currentTheme.secondary }}
    >
      <ThemeSelector />

      <div className="w-full max-w-sm md:max-w-md lg:max-w-lg">
        <div
          className="rounded-3xl p-8 md:p-10 shadow-2xl relative"
          style={{ backgroundColor: 'white' }}
        >

          {/* BACK BUTTON */}
          <button
            onClick={() => setCurrentScreen('adopt')}
            className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all hover:scale-105"
            style={{
              backgroundColor: currentTheme.secondary,
              color: currentTheme.text
            }}
          >
            ← Back
          </button>

          {/* TITLE */}
          <h2
            className="text-3xl md:text-4xl font-bold mb-8 text-center"
            style={{ color: currentTheme.text }}
          >
            Choose an Accessory
          </h2>

          {/* ACCESSORY GRID */}
          <div className="grid grid-cols-3 gap-3">

            {currentAccessories.map((item) => (

              <button
                key={item}

                onClick={() => toggleAccessory(item)}

                className="p-4 rounded-2xl shadow-md hover:shadow-lg transition-all"

                style={{
                  backgroundColor:
                    selectedAccessories.includes(item)
                      ? currentTheme.primary
                      : "white",

                  border: `2px solid ${
                    selectedAccessories.includes(item)
                      ? currentTheme.primary
                      : currentTheme.border
                  }`,
                }}
              >

                {/* ACCESSORY IMAGE */}
                <div className="mb-2">

                  <img
                    src={`/accessories/${item.toLowerCase()}.png`}
                    alt={item}
                    className="w-16 h-16 object-contain mx-auto"
                  />

                </div>

                {/* ACCESSORY NAME */}
                <p
                  className="text-sm font-medium"
                  style={{
                    color:
                      selectedAccessories.includes(item)
                        ? "white"
                        : currentTheme.text
                  }}
                >
                  {item}
                </p>

              </button>

            ))}

          </div>

          {/* CONTINUE BUTTON */}
          <div className="pt-6">

            <button
              onClick={() => {

                setPet({
                  name: petName,
                  type: selectedPetType as PetType,
                  color: '',
                  status: 'happy',
                  coins: 0,

                  accessories: selectedAccessories
                });

                setCurrentScreen('pet-room');
              }}

              disabled={false}

              className="w-full py-4 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed"

              style={{
                backgroundColor: currentTheme.primary
              }}

              onMouseEnter={(e) =>
                !e.currentTarget.disabled &&
                (e.currentTarget.style.backgroundColor =
                  currentTheme.primaryHover)
              }

              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  currentTheme.primary)
              }
            >
              Finish customization
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

  // 5. PET ROOM SCREEN
if (currentScreen === 'pet-room' && pet) {

  const petCareInfo = {
    dog: {
      type: "Loyal and energetic animals",
      faveFood: "Chicken, beef, dog treats",
      avoid: "Chocolate, grapes, onions",
      activities: "Walking, running, fetch"
    },

    cat: {
      type: "Independent and curious animals",
      faveFood: "Fish, chicken, cat treats",
      avoid: "Chocolate, milk, onions",
      activities: "Climbing, laser play, chasing toys"
    },

    bunny: {
      type: "Gentle and social animals",
      faveFood: "Carrots, hay, leafy greens",
      avoid: "Chocolate, bread, junk food",
      activities: "Hopping, exploring, tunnels"
    },

    hamster: {
      type: "Small nocturnal animals",
      faveFood: "Seeds, fruits, vegetables",
      avoid: "Citrus fruits, junk food",
      activities: "Wheel running, tunnels"
    },

    bird: {
      type: "Smart and vocal animals",
      faveFood: "Seeds, fruits",
      avoid: "Chocolate, avocado",
      activities: "Flying, singing, interaction"
    },

    hedgehog: {
      type: "Quiet and shy animals",
      faveFood: "Insects, cooked meat",
      avoid: "Milk, processed food",
      activities: "Exploring, running wheels"
    },

    guineapig: {
      type: "Friendly and social animals",
      faveFood: "Hay, vegetables, pellets",
      avoid: "Chocolate, dairy",
      activities: "Exploring, bonding time"
    }
  };

  const info =
    petCareInfo[
      pet.type as keyof typeof petCareInfo
    ];

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      style={{
        backgroundColor: currentTheme.secondary
      }}
    >

      <ThemeSelector />

      <div className="w-full max-w-sm md:max-w-md lg:max-w-lg">

        <div
          className="rounded-3xl p-8 md:p-10 shadow-2xl relative"
          style={{
            backgroundColor: 'white'
          }}
        >

          {/* HOME BUTTON */}
          <button
            onClick={() => setCurrentScreen('home')}
            className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all hover:scale-105"
            style={{
              backgroundColor:
                currentTheme.secondary,

              color: currentTheme.text
            }}
          >
            Home
          </button>

          {/* EDIT BUTTON */}
          <button
            onClick={() =>
              setCurrentScreen('edit-accessory')
            }

            className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all hover:scale-105"

            style={{
              backgroundColor:
                currentTheme.primary,

              color: 'white'
            }}
          >
             Edit
          </button>

          {/* PET CARD */}
          <div
            className="rounded-3xl p-8 mt-16 flex flex-col items-center"
            style={{
              backgroundColor:
                currentTheme.accent
            }}
          >

            {/* PET + ACCESSORY */}
            <div className="relative w-fit mx-auto mb-6">

              {/* PET */}
              <img
                src={`/pets/${pet.type}.png`}
                alt={pet.type}
                className="w-48 md:w-60 object-contain"
              />

              {/* RIBBON */}
              {pet.accessories?.includes("Ribbon") && (
                <img
                  src="/accessories/ribbon.png"
                  alt="Ribbon"
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 w-20"
                />
              )}

              {/* GLASSES */}
              {pet.accessories?.includes("Glasses") && (
                <img
                  src="/accessories/glasses.png"
                  alt="Glasses"
                  className="absolute top-16 left-1/2 -translate-x-1/2 w-24"
                />
              )}

              {/* FLOWER */}
              {pet.accessories?.includes("Flower") && (
                <img
                  src="/accessories/flower.png"
                  alt="Flower"
                  className="absolute top-10 right-10 w-14"
                />
              )}

            </div>

            {/* PET NAME */}
            <h2
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{
                color: currentTheme.text
              }}
            >
              {pet.name}
            </h2>

            {/* ACCESSORY */}
            <p
              className="text-lg mb-6 font-medium"
              style={{
                color: currentTheme.text
              }}
            >
              🎀 {pet.accessories?.join(', ')}
            </p>

            {/* INFO CARD */}
            <div
              className="w-full rounded-2xl p-5 text-left"
              style={{
                backgroundColor: 'white'
              }}
            >

              <h3
                className="font-bold text-lg mb-4"
                style={{
                  color: currentTheme.text
                }}
              >
                How to Care
              </h3>

              <div className="space-y-3">

                <p>
                  <strong>Animal Type:</strong>
                  {" "}
                  {info.type}
                </p>

                <p>
                  <strong>Favorite Food:</strong>
                  {" "}
                  {info.faveFood}
                </p>

                <p>
                  <strong>Foods to Avoid:</strong>
                  {" "}
                  {info.avoid}
                </p>

                <p>
                  <strong>Activities:</strong>
                  {" "}
                  {info.activities}
                </p>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}


// 7. EDIT ACCESSORY SCREEN
if (
  currentScreen === 'edit-accessory'
  && pet
) {

  const currentAccessories =
    accessories[
      pet.type as keyof typeof accessories
    ];

    if (!selectedAccessories.length && pet.accessories) {
  setSelectedAccessories(pet.accessories);
}
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      style={{
        backgroundColor: currentTheme.secondary
      }}
    >

      <ThemeSelector />

      <div className="w-full max-w-sm md:max-w-md lg:max-w-lg">

        <div
          className="rounded-3xl p-8 md:p-10 shadow-2xl relative"
          style={{
            backgroundColor: 'white'
          }}
        >

          {/* BACK BUTTON */}
          <button
            onClick={() =>
              setCurrentScreen('pet-room')
            }

            className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all hover:scale-105"

            style={{
              backgroundColor:
                currentTheme.secondary,

              color: currentTheme.text
            }}
          >
            ← Back
          </button>

          {/* TITLE */}
          <h2
            className="text-3xl md:text-4xl font-bold mb-8 text-center"
            style={{
              color: currentTheme.text
            }}
          >
            Edit Accessory
          </h2>

          {/* CURRENT PET PREVIEW */}
          <div
            className="rounded-3xl p-6 mb-6 flex flex-col items-center justify-center"
            style={{
              backgroundColor:
                currentTheme.accent
            }}
          >

            <div className="relative w-fit mx-auto mb-4">

              {/* PET IMAGE */}
              <img
                src={`/pets/${pet.type}.png`}
                alt={pet.type}
                className="w-32 md:w-40 object-contain"
              />

              {/* CURRENT ACCESSORY */}
              {selectedAccessories.includes("Ribbon") && (
                <img
                  src="/accessories/ribbon.png"
                  alt="Ribbon"
                  className="absolute top-2 left-1/2 -translate-x-1/2 w-16"
                />
              )}

              {selectedAccessories.includes("Glasses") && (
                <img
                  src="/accessories/glasses.png"
                  alt="Glasses"
                  className="absolute top-10 left-1/2 -translate-x-1/2 w-20"
                />
              )}

              {selectedAccessories.includes("Flower") && (
                <img
                  src="/accessories/flower.png"
                  alt="Flower"
                  className="absolute top-4 right-6 w-12"
                />
              )}

            </div>

            <h3
              className="text-2xl font-bold"
              style={{
                color: currentTheme.text
              }}
            >
              {pet.name}
            </h3>

          </div>

          {/* ACCESSORY GRID */}
          <div className="grid grid-cols-3 gap-3">

            {currentAccessories.map((item) => (

              <button
                key={item}

                onClick={() =>
                  setSelectedAccessory(item)
                }

                className="p-4 rounded-2xl shadow-md hover:shadow-lg transition-all"

                style={{
                  backgroundColor:
                    selectedAccessories.includes(item)
                      ? currentTheme.primary
                      : "white",

                  border: `2px solid ${
                    selectedAccessories.includes(item)
                      ? currentTheme.primary
                      : currentTheme.border
                  }`,
                }}
              >

                {/* ACCESSORY IMAGE */}
                <div className="mb-2">

                  <img
                    src={`/accessories/${item.toLowerCase()}.png`}
                    alt={item}
                    className="w-16 h-16 object-contain mx-auto"
                  />

                </div>

                {/* NAME */}
                <p
                  className="text-sm font-medium"
                  style={{
                    color:
                      selectedAccessories.includes(item)
                        ? "white"
                        : currentTheme.text
                  }}
                >
                  {item}
                </p>

              </button>

            ))}

          </div>

          {/* SAVE BUTTON */}
          <div className="pt-6">

            <button
              onClick={() => {

                const updatedPet = {
                  ...pet,
                  accessories: selectedAccessories
                };

                setPet(updatedPet);

                setCurrentScreen('pet-room');
              }}
              
              disabled={selectedAccessories.length === 0}

              className="w-full py-4 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed"

              style={{
                backgroundColor:
                  currentTheme.primary
              }}

              onMouseEnter={(e) =>
                !e.currentTarget.disabled &&
                (e.currentTarget.style.backgroundColor =
                  currentTheme.primaryHover)
              }

              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  currentTheme.primary)
              }
            >
              Save Accessory
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

  return null;
}
