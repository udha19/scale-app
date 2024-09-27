"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bodyFat, setBodyFat] = useState(0);
  const [muscleMass, setMuscleMass] = useState(0);
  const [visceralFat, setVisceralFat] = useState(0);
  const [basalMetabolicRate, setBasalMetabolicRate] = useState(0);
  const [bmi, setBmi] = useState(0);
  const [gender, setGender] = useState("male");
  const [birthdate, setbirthdate] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    document.getElementById("onboard_modal").showModal();
  }, []);

  const startIntro = () => {
    document.getElementById("intro_modal").showModal();
  };
  const startWeightForm = () => {
    document.getElementById("weight_modal").showModal();
  };
  const calculateBmi = () => {
    const heightMtr = height / 100;
    const bmi = weight / (heightMtr * heightMtr);

    setBmi(parseFloat(bmi).toFixed(1));
  };

  const BmiCategory = (bmi) => {
    switch (true) {
      case bmi < 18.5:
        setCategory("Underweight");
        break;
      case bmi >= 18.5 && bmi <= 24.9:
        setCategory("Normal Weight");
        break;
      case bmi >= 25 && bmi <= 29.9:
        setCategory("Overweight");
        break;
      case bmi >= 30 && bmi <= 34.9:
        setCategory("Obesity");
        break;
      default:
        setCategory("Invalid");
        break;
    }
  };
  const validateInput = (e) => {
    const val = e.target.value;
    const label = e.target.name;
    const regex = /^[0-9]{0,3}(\.[0-9]{0,1})?$/;
    if (regex.test(val)) {
      if (label === "height") {
        setHeight(val);
      } else if (label === "weight") {
        setWeight(val);
      }
    }
  };

  const validateInput2 = (e) => {
    const val = e.target.value;
    const label = e.target.name;
    const regex = /^[0-9]{0,2}(\.[0-9]{0,1})?$/;
    if (regex.test(val)) {
      if (label === "fat") {
        setBodyFat(val);
      } else if (label === "muscle") {
        setMuscleMass(val);
      }
    }
  };
  const calculateAge = () => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    return age;
  };
  const recalculate = () => {
    setBmi(0);
    setBasalMetabolicRate(0);
    setBodyFat(0);
    setMuscleMass(0);
    setGender("male");
    setbirthdate("");
    setWeight(0);
    setHeight(0);
    startIntro();
  };

  useEffect(() => {
    BmiCategory(bmi);
  }, [bmi]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center ">
        {bmi > 0 ? (
          <div className="flex flex-col gap-8 row-start-2 items-center ">
            <p>
              Hi <span className="capitalize">{name}</span>, Your BMI is <b>{bmi}</b>
            </p>
            <div className="flex gap-4 items-center flex-col sm:flex-row">
              <p>You are in <b> {category}</b> Category</p>
            </div>
            <div>
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr className="">
                      <th className="mx-8">Information</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover">
                      <td>Gender</td>
                      <td>{gender}</td>
                    </tr>
                    <tr className="hover">
                      <td>Age</td>
                      <td>{calculateAge()}</td>
                    </tr>
                    <tr className="hover">
                      <td>Weight</td>
                      <td>{weight} Kg</td>
                    </tr>
                    <tr className="hover">
                      <td>Height</td>
                      <td>{height} Cm</td>
                    </tr>
                    <tr className="hover">
                      <td>Body Fat</td>
                      <td>{bodyFat > 0 ? bodyFat : "-"} %</td>
                    </tr>
                    <tr className="hover">
                      <td>Muscle Mass</td>
                      <td>{muscleMass > 0 ? muscleMass : "-"} Kg</td>
                    </tr>
                    <tr className="hover">
                      <td>Visceral Fat</td>
                      <td>{visceralFat > 0 ? visceralFat : "-"}</td>
                    </tr>
                    <tr className="hover">
                      <td>Basal Metabolism</td>
                      <td>
                        {basalMetabolicRate > 0 ? basalMetabolicRate : "-"} Kcal
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <button
              className="btn btn-outline mt-20"
              onClick={() => recalculate()}
            >
              Recalculate
            </button>{" "}
          </div>
        ) : null}
      </main>

      <dialog id="onboard_modal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl h-96">
          <div className="flex flex-col px-8">
            <h3 className="font-bold text-lg text-center">Hello!</h3>
            <p className="py-4 text-center">
              Welcome to the Scale App, your personal health tracker!
            </p>
            <form method="dialog" className="grid justify-items-end">
              <button
                className="btn btn-outline mt-20"
                onClick={() => startIntro()}
              >
                Get Started
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id="intro_modal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl h-96">
          <div className="flex flex-col px-8">
            <h3 className="font-bold text-lg text-center">
              Alright, lets start!
            </h3>
            <p className="py-4">What is your name?</p>
            <input
              type="text"
              placeholder="Enter your name"
              className="input input-bordered w-full max-w-xs"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p className="py-4">Are You...</p>

            <label className="label cursor-pointer !justify-start ">
              <input
                type="radio"
                name="radio-10"
                className="radio mx-2"
                onCheck={() => setGender("male")}
                defaultChecked
              />
              <span className="label-text">Male</span>
            </label>
            <label className="label cursor-pointer !justify-start">
              <input
                type="radio"
                name="radio-10"
                className="radio mx-2"
                onCheck={() => setGender("female")}
              />
              <span className="label-text">Female</span>
            </label>
            <p className="py-4">Tell me Your birthday</p>
            <input
              type="date"
              placeholder="Enter your name"
              className="input input-bordered w-full max-w-xs"
              value={birthdate}
              onChange={(e) => setbirthdate(e.target.value)}
            />
            <form method="dialog" className="grid justify-items-end">
              <button
                className="btn btn-outline "
                onClick={() => startWeightForm()}
                disabled={name === "" || birthdate === ""}
              >
                Continue!
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id="weight_modal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl h-96">
          <div className="flex flex-col px-8">
            <h3 className="font-bold text-lg text-center">
              Last step, I promise..
            </h3>
            <p className="py-4">
              Tell me Your weight <b>(kg)</b>?
            </p>
            <input
              type="number"
              step="0.1"
              min="0"
              placeholder="Enter your weight"
              className="input input-bordered w-full max-w-xs"
              name="weight"
              value={weight}
              onChange={(e) => validateInput(e)}
            />
            <p className="py-4">
              Tell me Your height <b>(cm)</b>?
            </p>
            <input
              type="text"
              placeholder="Enter your height"
              className="input input-bordered w-full max-w-xs"
              name="height"
              value={height}
              onChange={(e) => validateInput(e)}
            />

            <p className="py-4">
              Tell me Your Body Fat <b>(%)</b>?
            </p>
            <input
              type="text"
              placeholder="Enter your weight"
              className="input input-bordered w-full max-w-xs"
              name="fat"
              value={bodyFat}
              onChange={(e) => validateInput2(e)}
            />
            <p className="py-4">
              Tell me Your Muscle Mass <b>(kg)</b>?
            </p>
            <input
              type="text"
              placeholder="Enter your weight"
              className="input input-bordered w-full max-w-xs"
              name="muscle"
              value={muscleMass}
              onChange={(e) => validateInput2(e)}
            />
            <p className="py-4">
              Tell me Your Visceral Fat <b>(1-12)</b>?
            </p>
            <input
              type="text"
              placeholder="Enter your weight"
              className="input input-bordered w-full max-w-xs"
              value={visceralFat}
              onChange={(e) => {
                if (e.target.value <= 12) {
                  setVisceralFat(e.target.value);
                }
              }}
            />
            <p className="py-4">
              Tell me Your Basal Metabolic Rate <b>(kcal)</b>?
            </p>
            <input
              type="number"
              placeholder="Enter your weight"
              className="input input-bordered w-full max-w-xs"
              value={basalMetabolicRate}
              onChange={(e) => {
                if (e.target.value.length <= 4) {
                  setBasalMetabolicRate(e.target.value);
                }
              }}
            />
            <form method="dialog" className="grid justify-items-end">
              <button
                className="btn btn-outline "
                disabled={weight <= 0 || height <= 0}
                onClick={() => calculateBmi()}
              >
                Finish!
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
