const readline = require("readline");

let name;
let age;
let sizePrice = [169000, 233000, 510000];
let chosenCakeSize;
let chosenCakePrice;
let moneyGotten;

function wait(second) {
  let waitPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, second * 1000);
  });
  return waitPromise;
}

function getInput(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (input) => {
      rl.close();
      resolve(input);
    });
  });
}

async function inputInfor() {
  console.log("Thông tin người nhận bánh:");
  name = await getInput("Tên: ");
  age = parseInt(await getInput("Tuổi: "));

  if (name != "" && age > 0) {
    console.log("Thành công \n");
  } else {
    console.log("Thất bại \n");
    process.exit(1);
  }
}

async function negotiation() {
  console.log("Xin tiền mẹ mua bánh!");
  moneyGotten = parseInt(await getInput("Số tiền nhận được: "));

  if (moneyGotten >= 0) {
    console.log("\nxin thành công số tiền: " + moneyGotten + "\n");
    if (moneyGotten > sizePrice[2]) {
      chosenCakeSize = "L";
      chosenCakePrice = sizePrice[2];
      console.log(
        "Thương lượng thành công xúc xích, có thể chọn size: " + chosenCakeSize + "\n"
      );
    } else if (moneyGotten > sizePrice[1]) {
      chosenCakeSize = "M";
      chosenCakePrice = sizePrice[1];
      console.log("Thương lượng thành công, có thể chọn size: " + chosenCakeSize + "\n");
    } else if (moneyGotten > sizePrice[0]) {
      chosenCakeSize = "S";
      chosenCakePrice = sizePrice[0];
      console.log("Thương lượng cũng thành công, có thể chọn size: " + chosenCakeSize + "\n");
    } else {
      console.log("Không đủ tiền!!!\nKèo này hỏng rồi!!!!!! \n");
      console.log("Chả lại cho mẹ: ", moneyGotten);
      console.log("\nSủiiiiiiiiiiii\n");
      process.exit(1); //cái này làm gì ?
    }
  } else {
    console.log("Mẹ không chịu cho tiền!?!?!?!?!?!? \n");
    console.log("Sủiiiiiiiiiiii\n");
    process.exit(1);
  }
  console.log("____________________________");
}


async function doGrocery() {
    console.log("Đi nào, tầm này thì chắc 10 phút là xong");
    await wait(10);
    console.log("Ok, đã xong, giờ thêm 2 phút để về");
    await wait(2);
    console.log("Con đã về zồi đây!!!!!!!!!!\n____________________________");

  }

async function cook() {
    async function prepare() {
        return new Promise(async (resolve, reject) => {
            console.log("Sơ chế nguyên liệu.\n");
            console.log("1.Tách trứng.\n2.Ray bột.\n3.Chuẩn bị gia vị.");
            await wait(4);
            for(let i = 0; i < wait(4); i++){
                process.stdout.write("Còn"+parseInt(4-i)+"s nữa thôi\n");
            }
            console.log("Vậy là chuẩn bị xong!!!!\n____________________________");
            resolve();
        });
    }

    async function cakeFoundation() {
        return new Promise(async (resolve, reject) => {
            console.log("Làm bột bánh.");
            await wait(5);
            console.log("Đánh kem.");
            await wait(5);
            console.log("OK! Giờ nướng bánh.\n");
            console.log("-----------------------------");

            resolve();
        });
    }

    async function bake() {
        return new Promise(async (resolve, reject) => {
          console.log("Ủ bánh");
          await wait(5);
          console.log("Đổ khuôn");
          await wait(5);
          console.log("Nướng bánh");
          await wait(5);
          console.log("Trang trí nữa thôi là xong\n");
          console.log("-----------------------------");
          resolve();
        });
    }

    await prepare();
    await cakeFoundation();
    await bake();

}

async function decorate() {
    console.log("Quết kem.");
    await wait(3);
    console.log("Trang trí.");
    await wait(3);
    console.log("Viết tên lên bánh.");
    await wait(3);
    console.log("Và hoàn thành cái bánh!!! ____________________________");
  }

async function consume() {
    console.log("\nMình không có quất cái bánh được, tại vì nó không có hư. Nên là mình ĂN nó.\n");
    await wait(1);
    console.log("============================-END-============================");
    let change = moneyGotten - chosenCakePrice;
    console.log("\nNãy mẹ cho mình: ",moneyGotten);
    console.log("Mà cái bánh thì có: ",chosenCakePrice);
    console.log(`Vậy trả mẹ tiền thừa: ${change}\n\n`);
}


async function main() {
    await inputInfor().then(async () => {
      await negotiation().then(async () => {
        console.log(
            `============================\n
            Giờ mình làm bánh cho: ${name}, 
            nhân dịp sinh nhật ${age} tuổi của bản. 
            Mình chọn hẳn cái bánh size ${chosenCakeSize}, 
            thiệt hại ${chosenCakePrice} đồng
            \n============================`
          );

      })
      await doGrocery();
      await cook();
      await decorate();
      await consume();
    })
  };
  
  main();