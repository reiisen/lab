import { FiCodesandbox } from "solid-icons/fi";
import { FiHelpCircle } from "solid-icons/fi";
import { createSignal, type Component } from "solid-js";
import { CardWithIcon } from "./ui/Card";
import { colorCycle } from "../utils/rgb";
import { Popup } from "./ui/Popup";
import { Help } from "./Help";
import help1 from '../assets/help1.jpg'
import help2 from '../assets/help2.jpg'
import help3 from '../assets/help3.jpg'
import help4 from '../assets/help4.jpg'

const cardGrid = "grid grid-cols-1 md:grid-cols-2 gap-4 p-4";
const cardLink = "no-underline";
const welcomeContainer = "text-center p-4";
const welcomeTextTop = "text-3xl font-bold";
const welcomeTextBottom = "text-4xl font-bold mt-2";

export const Home: Component = () => {
  const helpSteps = [
    {
      title: "Memulai",
      content: "Untuk memulai, silahkan klik reserve",
      image: help1
    },
    {
      title: "Seleksi Lab atau Ruangan",
      content: "Silahkan pilih ruangan atau lab yang ingin di reservasi",
      image: help2
    },
    {
      title: "Pilih Komputer (jika ada)",
      content: "Untuk lab, silahkan pilih komputer terlebih dahulu",
      image: help3
    },
    {
      title: "Pilih waktu/tangga;",
      content: "Silahkan pilih slot waktu dan lakukan reservasi. Logo merah artinya slot itu sudah terambil(1), gunakan fitur tanggal diatas untuk mengatur tanggal(2)",
      image: help4
    },
  ];
  const HelpButton = () => {
    return (
      <CardWithIcon text="Help" icon={FiHelpCircle}>
        Click here to show a step by step process
      </CardWithIcon>
    )
  }
  const HelpContent = () => {
    return (
      <Help steps={helpSteps} />
    )
  }
  return (
    <>
      <div class={welcomeContainer}>
        <div class={welcomeTextBottom}>Reservasi Lab</div>
      </div>
      <div class={cardGrid}>
        <a href="/labs" class={cardLink}>
          <CardWithIcon text="Reserve" icon={FiCodesandbox}>
            Click here to start your reservation process
          </CardWithIcon>
        </a>
        <Popup trigger={HelpButton} content={HelpContent} />
      </div>
    </>
  );
};
