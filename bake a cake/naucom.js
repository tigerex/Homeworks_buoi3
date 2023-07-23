function wait(second) {
  let waitPromise = new Promise((resolver, rejector) => {
    setTimeout(() => {
      resolver();
    }, second * 1000);
  });
  return waitPromise;
}

async function askForDinner() {
  console.log("Hỏi mẹ ăn gì");
  await wait(1);
  console.log("Ăn cơm với thịt và canh chua");
}

async function getMoney() {
  console.log("Lấy tiền mẹ thôi!!!!");
  await wait(0.5);
  console.log("Có tiền rồi!!!!! Đi chợ thôi");
}
async function goToMarket() {
  console.log("Bắt đầu đi chợ");
  await wait(4);
  console.log("Bắt đầu về");
  await wait(2);
  console.log("Về đến nhà rồi nè mẹ ơi!!!!!!!!!!");
}

async function cook() {
  async function soChe() {
    console.log("Sơ chế nguyên liệu\n==================");
    console.log("\n1.Lặt rau");
    console.log("\n2.Thái thịt");
    console.log("Vo gạo");
    await wait(5);
    console.log("sơ chế hoàn thành");
  }
  async function nauCom() {
    return new Promise(async (resolve, reject) => {
      console.log("Bắt nồi cơm ");
      await wait(10);
      console.log("Cơm chín rồi!!!!!!!!");
      resolve();
    });
  }
  async function nauCanh() {
    return new Promise(async (resolve, reject) => {
      console.log("Bắt đầu nấu canh");
      await wait(5);
      console.log("Canh nấu xong");
    });
  }
  async function nauDoAn() {
    return new Promise(async (resolve, reject) => {
      console.log("Chiên thịt");
      console.log("chiên cá");
      await wait(3);
      console.log("Xong đồ ăn");
    });
  }
  await soChe();
  let process = new Promise(async (resolver, rejector) => {
    nauCom().then(() => {
      resolver();
    }); 
    nauCanh();
    nauDoAn();
  });
  return process;
}
async function donCom() {
  await wait(2);
  console.log("Dọn lên bàn");
}
async function quat() {
  console.log("Mời ba mẹ ăn cơm");
  await wait(1);
  console.log("Quất!!!!!!!!!!!!!!!!!!!!!");
}
let main = async function () {
  await askForDinner();
  await getMoney();
  await goToMarket();
  await cook().then(async () => {
    await donCom();
    await quat();
  });
};

main();