import {
  MdOutlineApartment,
  MdHouseSiding,
  MdOutlineWater,
  MdCabin,
} from "react-icons/md";
import { BsSnow } from "react-icons/bs";
import { BiHomeAlt } from "react-icons/bi";
import {
  GiKidSlide,
  GiSpaceNeedle,
  GiCampingTent,
  GiLightningDome,
  GiEvilTree,
  GiWaveSurfer,
  GiMountainCave,
  GiCaveEntrance,
  GiGolfFlag,
} from "react-icons/gi";
import { AiOutlineCoffee } from "react-icons/ai";
import { FaCampground, FaUmbrellaBeach, FaSwimmingPool } from "react-icons/fa";
import { RiEarthquakeFill } from "react-icons/ri";

export const locationsTab = [
  {
    id: 1,
    label: "Design",
    icon: (
      <MdOutlineApartment
        size={28}
        className="text-darkGrey hover:text-black active:text-black"
      />
    ),
  },
  {
    id: 2,
    label: "Arctic",
    icon: (
      <BsSnow
        size={28}
        className="text-darkGrey hover:text-black active:text-black"
      />
    ),
  },
  {
    id: 3,
    label: "Shared Homes",
    icon: (
      <MdHouseSiding
        size={28}
        className="text-darkGrey hover:text-black active:text-black"
      />
    ),
  },
  {
    id: 4,
    label: "LakeFront",
    icon: (
      <MdOutlineWater
        size={28}
        className="text-darkGrey hover:text-black active:text-black"
      />
    ),
  },
  {
    id: 5,
    label: "National Parks",
    icon: (
      <GiKidSlide
        size={28}
        className="text-darkGrey hover:text-black active:text-black"
      />
    ),
  },
  {
    id: 6,
    label: "Bed & Breakfast ",
    icon: (
      <AiOutlineCoffee
        size={28}
        className="text-darkGrey hover:text-black active:text-black"
      />
    ),
  },
  {
    id: 7,
    label: "OMG!",
    icon: (
      <GiSpaceNeedle
        size={28}
        className="text-darkGrey hover:text-black active:text-black"
      />
    ),
  },
  {
    id: 8,
    label: "Camping",
    icon: (
      <FaCampground
        size={28}
        className="text-darkGrey hover:text-black active:text-black"
      />
    ),
  },
  {
    id: 9,
    label: "A-frames",
    icon: (
      <GiCampingTent
        size={28}
        className="text-darkGrey hover:text-black active:text-black"
      />
    ),
  },
  {
    id: 10,
    label: "Domes",
    icon: (
      <GiLightningDome
        size={28}
        className="text-darkGrey hover:text-black active:text-black"
      />
    ),
  },
  {
    id: 11,
    label: "Tiny Homes",
    icon: (
      <BiHomeAlt
        size={28}
        className="text-darkGrey hover:text-black active:text-black"
      />
    ),
  },
  {
    id: 12,
    label: "Treehouses",
    icon: (
      <GiEvilTree
        size={28}
        className="text-darkGrey hover:text-black active:text-black"
      />
    ),
  },
  {
    id: 13,
    label: "Surfing",
    icon: (
      <GiWaveSurfer
        size={28}
        className="text-darkGrey hover:text-black active:text-black"
      />
    ),
  },
  {
    id: 14,
    label: "CountrySide",
    icon: (
      <GiMountainCave
        size={28}
        className="text-darkGrey hover:text-black active:text-black"
      />
    ),
  },
  {
    id: 15,
    label: "Caves",
    icon: (
      <GiCaveEntrance
        size={28}
        className="text-darkGrey hover:text-black active:text-black"
      />
    ),
  },
  {
    id: 16,
    label: "Golfing",
    icon: (
      <GiGolfFlag
        size={28}
        className="text-darkGrey hover:text-black active:text-black"
      />
    ),
  },
  {
    id: 17,
    label: "Cabins",
    icon: (
      <MdCabin
        size={28}
        className="text-darkGrey hover:text-black active:text-black"
      />
    ),
  },
  {
    id: 18,
    label: "Earth Homes",
    icon: (
      <RiEarthquakeFill
        size={28}
        className="text-darkGrey hover:text-black active:text-black"
      />
    ),
  },
  {
    id: 19,
    label: "Tropical",
    icon: (
      <FaUmbrellaBeach
        size={28}
        className="text-darkGrey hover:text-black active:text-black"
      />
    ),
  },
  {
    id: 20,
    label: "Amazing Pools",
    icon: (
      <FaSwimmingPool
        size={28}
        className="text-darkGrey hover:text-black active:text-black"
      />
    ),
  },
];
