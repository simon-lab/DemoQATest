const { test, expect } = require('@playwright/test')

test.describe("Examples", () => {

    test.only("Text Box", async ({ page }) => {
        await page.goto("https://demoqa.com/text-box");
        await page.pause();
        await page.locator('//input[@id="userName"]').type("Raja");
        await page.locator('//input[@id="userEmail"]').type("rajasimon0@gmail.com");
        await page.locator('//textarea[@id="currentAddress"]').type("Cadas");
        await page.locator('//textarea[@id="permanentAddress"]').type("Cadas");
        await page.locator('//button[@id="submit"]').click();

        const name = page.locator('#name');

        await expect(name).toBeVisible();
        await expect(name).toHaveText('Name:Raja');
        await expect(page.locator('//p[@id="email"]')).toBeVisible();
        await expect(page.locator('//p[@id="email"]')).toHaveText("Email:rajasimon0@gmail.com");
        await expect(page.locator('//p[@id="currentAddress"]')).toBeVisible();
        await expect(page.locator('//p[@id="currentAddress"]')).toHaveText("Current Address :Cadas");
        await expect(page.locator('//p[@id="permanentAddress"]')).toBeVisible();
        await expect(page.locator('//p[@id="permanentAddress"]')).toHaveText("Permananet Address :Cadas");
    })//Done

    test("Check Box", async ({ page }) => {
        await page.goto("https://demoqa.com/checkbox");
        await page.locator('//span[@class="rct-title"]').check();
        await page.pause();
        await expect(page.locator('//span[@class="rct-title"]')).toBeChecked();
    })//Done

    test("Radio Button", async ({ page }) => {
        await page.goto("https://demoqa.com/radio-button");
        await page.locator('//label[.="Yes"]').check();
        await page.pause();
        await expect(page.locator('//label[.="Yes"]')).toBeChecked();
        await page.locator('//label[.="Impressive"]').check();
        await expect(page.locator('//label[.="Impressive"]')).toBeChecked();
        await expect(page.locator('//label[@class="custom-control-label disabled"]')).toBeDisabled();
    })//Done

    test("Web Tables", async ({ page }) => {
        await page.goto("https://demoqa.com/webtables");
        await page.locator('//button[@id="addNewRecordButton"]').click();
        await page.locator('//input[@id="firstName"]').type("Raja");
        await page.locator('//input[@id="lastName"]').type("Simontua");
        await page.locator('//input[@id="userEmail"]').type("test@gmail.com");
        await page.locator('//input[@id="age"]').type("20");
        await page.locator('//input[@id="salary"]').type("3000000");
        await page.locator('//input[@id="department"]').type("Logistik");
        await page.locator('//button[@id="submit"]').click();

        await expect(page.locator('//div[.="Raja"]')).toBeVisible();
        await expect(page.locator('//div[.="Simontua"]')).toBeVisible();
        await expect(page.locator('//div[.="20"]')).toBeVisible();
        await expect(page.locator('//div[.="test@gmail.com"]')).toBeVisible();
        await expect(page.locator('//div[.="3000000"]')).toBeVisible();
        await expect(page.locator('//div[.="Logistik"]')).toBeVisible();

        await page.pause();
        await page.locator('id=edit-record-4').click();
        await expect(page.locator('//div[@id="registration-form-modal"]')).toBeVisible();
        await page.locator('//button[@class="close"]').click();
        await page.locator('id=delete-record-4').click();
    })//Done

    test("Buttons", async ({ page }) => {
        await page.goto("https://demoqa.com/buttons");
        await page.pause();
        await page.locator('//button[@id="doubleClickBtn"]').dblclick();
        await page.locator('//button[@id="rightClickBtn"]').click({ button: 'right' });
        await page.locator('//button[.="Click Me"]').click();
    })//DoneNoAssertion

    test("Links", async ({ page }) => {
        await page.goto("https://demoqa.com/links");
        await page.pause();
        await page.locator('//a[@id="simpleLink"]').click();
        await page.locator('//a[@id="created"]').click();
        await expect(page.locator('id=linkResponse')).toHaveText("Link has responded with staus 201 and status text Created");
    })//TroubleAssertion

    test("Download", async ({ page }) => {
        await page.pause();
        await page.goto("https://demoqa.com/upload-download");
        const [download] = await Promise.all([
            page.waitForEvent('download'),
            page.locator('//a[@id="downloadButton"]').click(),
        ]);
        const path = await download.path();
        const url = download.url();
        console.log(path);
        console.log(url);
    })//Done

    test("Download2", async ({ page }) => {
        await page.pause();
        await page.goto('https://demoqa.com/upload-download')
        const [download] = await Promise.all([
            page.waitForEvent('download'),
            page.locator('//a[@id="downloadButton"]').click(),
        ])
        await download.saveAs('sampleFile.jpeg')
        expect(fs.existsSync('sampleFile.jpeg')).toBeTruthy()
    })//Trouble saveas

    test("Download3", async ({ page }) => {
        await page.goto('https://demoqa.com/upload-download')
        await page.pause();
        const downloadPromise = page.waitForEvent('download');
        page.locator('//a[@id="downloadButton"]').click();
        const download = await downloadPromise;
        await download.saveAs('sampleFile.jpeg');
        expect(fs.existsSync('sampleFile.jpeg')).toBeTruthy()
    })//Trouble saveas


    test("upload", async ({ page }) => {
        await page.pause();
        await page.goto('https://demoqa.com/upload-download');
        await page.setInputFiles('//input[@id="uploadFile"]', 'Lambda.txt');
        await expect(page.getByText('C:\fakepath\Lambda.txt')).toBeVisible();
        await expect(page.locator('text=Lambda.txt')).toBeVisible();
    })//Done

    test("Forms", async ({ page }) => {
        await page.pause();
        await page.goto("https://demoqa.com/automation-practice-form");
        await page.locator('#firstName').type("Raja");
        await page.locator('#lastName').type("Simontua");
        await page.locator('[placeholder="name@example.com"]').type("rajasimon0@gmail.com");
        await page.locator('//label[.="Male"]').check();
        await page.locator('#userNumber').type("0812345678");
        await page.locator("//label[.='Sports']").check();
        await page.locator('#currentAddress').type("Good");
        await page.locator('//button[@id="submit"]').click();
    })//Trouble web

    test("New Tab", async ({ page }) => {
        await page.goto('https://demoqa.com/browser-windows');
        await page.pause();
        await page.locator('//button[@id="tabButton"]').click()
        expect(await pages[2].url()).toEqual('https://demoqa.com/sample');
    })//trouble link assertion

    test("Alerts", async ({ page }) => {
        await page.goto('https://demoqa.com/alerts');
        await page.pause();
        page.on('dialog', dialog => dialog.accept());
        await page.click('//button[@id="alertButton"]');
        await page.click('//button[@id="confirmButton"]');
        await expect(page.locator('//span[@id="confirmResult"]')).toHaveText("You selected Ok");
    })//Done

    test("Prompt", async ({ page }) => {
        await page.goto('https://demoqa.com/alerts');
        await page.pause();
        page.on('dialog', dialog => dialog.accept('Simon'));
        await page.locator('//button[@id="promtButton"]').click();
        await expect(page.locator('//span[@id="promptResult"]')).toHaveText('You entered Simon');
    })//Done

    test("Accordian", async ({ page }) => {
        await page.goto('https://demoqa.com/accordian');
        await page.pause();
        await page.locator('//div[.="What is Lorem Ipsum?"]').click();
        await expect(page.locator('id=section1Content')).toBeHidden();
        await expect(page.locator('id=section2Content')).toBeHidden();
        await expect(page.locator('id=section3Content')).toBeHidden();
        await page.locator('//div[.="Where does it come from?"]').click();
        await expect(page.locator('id=section1Content')).toBeHidden();
        await expect(page.locator('id=section2Content')).toBeVisible();
        await expect(page.locator('id=section3Content')).toBeHidden();
        await page.locator('//div[.="Why do we use it?"]').click();
        await expect(page.locator('id=section1Content')).toBeHidden();
        await expect(page.locator('id=section2Content')).toBeHidden();
        await expect(page.locator('id=section3Content')).toBeVisible();
    })//Done

    test("Auto Complete", async ({ page }) => {
        await page.goto('https://demoqa.com/auto-complete');
        await page.pause();
        await page.locator('.auto-complete__value-container').first().click();
        await page.locator('#autoCompleteMultipleInput').fill('r');
        await page.getByText('Red', { exact: true }).click();
        await expect(page.locator('//div[@class="css-12jo7m5 auto-complete__multi-value__label"]')).toHaveText('Red');
        await page.locator('#autoCompleteMultipleInput').fill('g');
        await page.getByText('Green', { exact: true }).click();
        await expect(page.locator('//div[@class="css-12jo7m5 auto-complete__multi-value__label"]').nth(1)).toHaveText('Green');
        await page.locator('#autoCompleteMultipleContainer path').nth(1).click();
        await page.locator('//div[@class="auto-complete__value-container css-1hwfws3"]').click();
        await page.locator('#autoCompleteSingleInput').fill('g');
        await page.getByText('Green', { exact: true }).click();
        await expect(page.locator('//div[@class="auto-complete__single-value css-1uccc91-singleValue"]')).toHaveText('Green');
    })//Done

    test("Date Picker", async ({ page }) => {
        await page.goto('https://demoqa.com/date-picker');
        await page.pause();
        await page.locator('//input[@id="datePickerMonthYearInput"]').clear();
        await page.locator('//input[@id="datePickerMonthYearInput"]').click();
        await page.locator('//select[@class="react-datepicker__month-select"]').selectOption('August');
        await page.locator('//select[@class="react-datepicker__year-select"]').selectOption('2001');
        await page.getByRole('option', { name: 'Choose Monday, August 20th, 2001' }).click();
        await expect(page.locator('//input[@id="datePickerMonthYearInput"]')).toHaveValue('08/20/2001');

        await page.locator('//input[@id="dateAndTimePickerInput"]').clear();
        await page.locator('//input[@id="dateAndTimePickerInput"]').click();
        await page.locator('//span[@class="react-datepicker__month-read-view--selected-month"]').click();
        await page.getByText('August').click();
        await page.locator('//div[@class="react-datepicker__year-read-view"]').click();
        await page.locator('a').nth(3).click({
            clickCount: 17
        });
        await page.getByText('2001').click();
        await page.getByRole('option', { name: 'Choose Monday, August 20th, 2001' }).click();
        await page.locator('//li[.="07:00"]').click();
        await expect(page.locator('//input[@id="dateAndTimePickerInput"]')).toHaveValue('August 20, 2001 7:00 AM');
    })//Done

    test("Slider", async ({ page }) => {
        await page.goto("https://demoqa.com/slider");
        await page.pause();
        await page.click('//input[@class="range-slider range-slider--primary"]', {
            moveTo: 100,
        });
    })//Trouble

    test("Progress Bar", async ({ page }) => {
        await page.goto("https://demoqa.com/progress-bar");
        await page.pause();
        await page.locator('//button[@id="startStopButton"]').click();
        await page.waitForFunction(() => {
            const progressBar = document.querySelector('.progress-bar[role="progressbar"]');
            return progressBar.getAttribute('aria-valuenow') === '100';
        });
        await expect(page.locator('role=progressBar')).toHaveClass('progress-bar bg-success');
        await expect(page.locator('//button[@id="resetButton"]')).toBeVisible();
        await page.locator('//button[@id="resetButton"]').click();
        await expect(page.locator('role=progressbar')).toHaveText('0%');
    })//done

    test("Tabs", async ({ page }) => {
        await page.goto("https://demoqa.com/tabs");
        await page.pause();
        await page.locator('//a[@id="demo-tab-origin"]').click();
        await expect(page.locator('//p[contains(.,"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots")]')).toBeVisible();
        await expect(page.locator('//p[contains(.,"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem")]')).toBeHidden();
        await expect(page.locator('//p[contains(.,"It is a long established fact that a reader will be distracted by the readable c")]')).toBeHidden();
        await page.locator('//a[@id="demo-tab-use"]').click();
        await expect(page.locator('//p[contains(.,"It is a long established fact that a reader will be distracted by the readable c")]')).toBeVisible();
        await expect(page.locator('//p[contains(.,"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem")]')).toBeHidden();
        await expect(page.locator('//p[contains(.,"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots")]')).toBeHidden();
        await page.locator('//a[@id="demo-tab-what"]').click();
        await expect(page.locator('//p[contains(.,"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem")]')).toBeVisible();
        await expect(page.locator('//p[contains(.,"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots")]')).toBeHidden();
        await expect(page.locator('//p[contains(.,"It is a long established fact that a reader will be distracted by the readable c")]')).toBeHidden();
        await expect(page.locator('//a[@id="demo-tab-more"]')).toBeDisabled();
    })//Done

    test("Tool Tips Hover", async ({ page }) => {
        await page.goto('https://demoqa.com/tool-tips');
        await page.pause();
        await page.hover('//button[@id="toolTipButton"]');
        await expect(page.locator('role=tooltip')).toHaveClass('fade show tooltip bs-tooltip-right');
        await page.hover('//input[@id="toolTipTextField"]');
        await expect(page.locator('role=tooltip')).toHaveClass('fade show tooltip bs-tooltip-bottom');
        await page.hover('//a[.="Contrary"]');
        await expect(page.locator('role=tooltip')).toHaveClass('fade show tooltip bs-tooltip-bottom');
    })//done

    test("Menu", async ({ page }) => {
        await page.goto('https://demoqa.com/menu#');
        await page.pause();
        await page.hover('//a[.="Main Item 2"]');
        await expect(page.getByText('Sub Item').nth(0)).toBeVisible();
        await expect(page.getByText('Sub Item').nth(1)).toBeVisible();
        await expect(page.getByText('SUB SUB LIST')).toBeVisible();
        await page.hover('//a[.="SUB SUB LIST »"]');
        await expect(page.locator('//a[.="Sub Sub Item 1"]')).toBeVisible();
        await expect(page.locator('//a[.="Sub Sub Item 2"]')).toBeVisible();
    })//Done

    test("Select Menu", async ({ page }) => {
        await page.goto('https://demoqa.com/select-menu');
        await page.pause();
        await page.locator('id=withOptGroup').click();
        await page.getByText('A root option').click();
        await page.locator('id=selectOne').click();
        await page.getByText('Dr.').nth(1).click();
        await page.locator('id=oldSelectMenu').selectOption({ value: "1" });
        await page.locator('.css-1wa3eu0-placeholder').click();
        await page.getByText('Green').nth(1).click();
        await page.getByText('Black').nth(1).click();
        await page.locator('.css-19bqh2r').nth(5).click();
        await page.locator('//select[@id="cars"]').selectOption('Volvo');

        await expect(page.locator('id=withOptGroup')).toHaveText('A root option');
        await expect(page.locator('id=selectOne')).toHaveText('Dr.');
        await expect(page.locator('id=oldSelectMenu')).toHaveValue('1');
        await expect(page.locator('.css-1rhbuit-multiValue').nth(0)).toHaveText('Green');
        await expect(page.locator('.css-1rhbuit-multiValue').nth(1)).toHaveText('Black');
        await expect(page.locator('//select[@id="cars"]')).toHaveValue('volvo');
    })//done

    test("Sortable", async ({ page }) => {
        await page.goto('https://demoqa.com/sortable');
        await page.pause();
        await page.locator('//a[@id="demo-tab-grid"]').click();
        await expect(page.locator('#demo-tabpane-list')).toHaveClass('fade tab-pane');
        await expect(page.locator('#demo-tabpane-grid')).toHaveClass('fade tab-pane active show');
        await page.dragAndDrop('//div[@class="create-grid"]/div[.="One"]', '//div[@class="create-grid"]/div[.="Two"]');
        await page.locator('//a[@id="demo-tab-list"]').click();
        await expect(page.locator('#demo-tabpane-list')).toHaveClass('fade tab-pane active show');
        await expect(page.locator('#demo-tabpane-grid')).toHaveClass('fade tab-pane');
        await page.dragAndDrop('//div[@class="vertical-list-container mt-4"]/div[.="One"]', '//div[@class="vertical-list-container mt-4"]/div[.="Two"]');
    })//Done Trouble Assertion

    test("Selectable", async ({ page }) => {
        await page.goto("https://demoqa.com/selectable");
        await page.pause();
        await page.locator('//li[.="Cras justo odio"]').click();
        await page.locator('//li[.="Dapibus ac facilisis in"]').click();
        await expect(page.getByText('Cras justo odio')).toHaveClass('mt-2 list-group-item active list-group-item-action');
        await expect(page.getByText('Dapibus ac facilisis in')).toHaveClass('mt-2 list-group-item active list-group-item-action');
        await page.locator('//a[@id="demo-tab-grid"]').click();
        await page.locator('//li[.="One"]').click();
        await page.locator('//li[.="Two"]').click();
        await expect(page.getByText('One')).toHaveClass('list-group-item active list-group-item-action');
        await expect(page.getByText('Two')).toHaveClass('list-group-item active list-group-item-action');
    })//Done

    test("Resizable", async ({ page }) => {
        await page.goto("https://demoqa.com/resizable");
        await page.pause();
        await page.dragAndDrop('//div[@id="resizableBoxWithRestriction"]/span[@class="react-resizable-handle react-resizable-handle-se"]', '//div[@class="col-12 mt-4 col-md-3"]');
        await expect(page.locator('//div[@id="resizableBoxWithRestriction"]')).toHaveAttribute({width: '500'});
        await expect(page.locator('//div[@id="resizableBoxWithRestriction"]')).toHaveAttribute({height: '280'});
       // expect(await page.locator('id=resizableBoxWithRestriction').getAttribute('width')).toBe('500');
       // expect(await page.locator('//div[@id="resizableBoxWithRestriction"]').getAttribute('height')).toBe('280');
    })//TroubleAAssertion

    test("Droppable", async ({ page }) => {
        await page.goto("https://demoqa.com/droppable");
        await page.pause();
        await page.dragAndDrop('//div[@id="draggable"]', '//div[@id="simpleDropContainer"]/div[@id="droppable"]');
        await expect(page.locator('//div[@class="drop-box ui-droppable ui-state-highlight"]')).toHaveText('Dropped!');

        await page.locator('//a[@id="droppableExample-tab-accept"]').click();
        await page.dragAndDrop('//div[@id="notAcceptable"]', '//div[@id="acceptDropContainer"]/div[@id="droppable"]');
        await expect(page.locator('//div[@id="acceptDropContainer"]/div[@id="droppable"]')).not.toHaveText('Dropped!');
        await page.dragAndDrop('//div[@id="notAcceptable"]', '//div[@class="col-12 mt-4 col-md-6"]');
        await page.dragAndDrop('//div[@id="acceptable"]', '//div[@id="acceptDropContainer"]/div[@id="droppable"]');
        await expect(page.locator('//div[@id="acceptDropContainer"]/div[@id="droppable"]')).toHaveText('Dropped!');

        await page.locator('//a[@id="droppableExample-tab-preventPropogation"]').click();
        await page.dragAndDrop('//div[@id="dragBox"]', '//div[@id="notGreedyInnerDropBox"]');
        await expect(page.locator('//div[@id="notGreedyInnerDropBox"]')).toHaveText('Dropped!');
        await expect(page.locator('//div[@id="notGreedyDropBox"]')).toHaveText('Dropped!Dropped!');
        await page.dragAndDrop('//div[@id="dragBox"]', '//div[@id="greedyDropBoxInner"]');
        await expect(page.locator('//div[@id="greedyDropBoxInner"]')).toHaveText('Dropped!');
        await expect(page.locator('//div[@id="greedyDropBox"]')).not.toHaveText('Dropped!');
        
    })//Done

    test("Dragabble", async ({ page }) => {
        await page.goto("https://demoqa.com/dragabble");
        await page.pause();
        await page.dragAndDrop('//div[@id="dragBox"]', '//div[@class="col-12 mt-4 col-md-6"]');
        await page.locator('//a[@id="draggableExample-tab-axisRestriction"]').click();
        await page.dragAndDrop('//div[@id="restrictedX"]', '//div[@class="col-12 mt-4 col-md-6"]');
        await page.dragAndDrop('//div[@id="restrictedY"]', '//div[@class="col-12 mt-4 col-md-6"]');
        await page.locator('//a[@id="draggableExample-tab-containerRestriction"]').click();
        await page.dragAndDrop('//div[@class="draggable ui-widget-content ui-draggable ui-draggable-handle"]', '//div[@class="col-12 mt-4 col-md-3"]');
        await page.dragAndDrop('//span[@class="ui-widget-header ui-draggable ui-draggable-handle"]', '//div[@class="col-12 mt-4 col-md-6"]');
    })//Done

})

