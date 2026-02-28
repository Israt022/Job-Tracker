let interviewList = [];
let rejectList = [];
let currentStatus = 'all';

// Card Count
let total = document.getElementById('total');
let jobTotal = document.getElementById('jobTotal');
let interviewCount = document.getElementById('interviewCount');
let rejectCount = document.getElementById('rejectCount');

// Filter Button 
const allFilterBtn = document.getElementById('all-filter-btn')
const interviewFilterBtn = document.getElementById('interview-filter-btn')
const rejectFilterBtn = document.getElementById('reject-filter-btn')


const allCardSection = document.getElementById('allCards');
const mainContainer = document.querySelector('main');
const filterSection = document.getElementById('filter-section');
const deleteBtn = document.querySelectorAll('.deleteBtn');
const jobStatusText = document.getElementById('jobStatusText');



// Count all calculate Job - Interview - Reject 
function calculateCount(){
    total.innerText = allCardSection.children.length;
    jobTotal.innerText = allCardSection.children.length;
    interviewCount.innerText = interviewList.length;
    rejectCount.innerText = rejectList.length;

    const totalJobs = document.querySelectorAll('#allCards .card').length;

    if(currentStatus === 'all-filter-btn'){
        jobStatusText.innerText = `${totalJobs} Jobs`;
    }else if(currentStatus === 'interview-filter-btn'){
        jobStatusText.innerText = `${interviewList.length} of ${totalJobs} Jobs`;
    }else if(currentStatus === 'reject-filter-btn'){
        jobStatusText.innerText = `${rejectList.length} of ${totalJobs} Jobs`;
    }
}


calculateCount();

function toggleStyle(id){
    // Add same filter
    allFilterBtn.classList.add('btn','text-[#64748B]');
    interviewFilterBtn.classList.add('btn','text-[#64748B]');
    rejectFilterBtn.classList.add('btn','text-[#64748B]');

    // Remove primary button 
    allFilterBtn.classList.remove('btn-primary','text-white');
    interviewFilterBtn.classList.remove('btn-primary','text-white');
    rejectFilterBtn.classList.remove('btn-primary','text-white');

    const selectedButton = document.getElementById(id);
    currentStatus = id;

    selectedButton.classList.add('btn-primary','text-white');
    
    if(id === 'interview-filter-btn'){
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderInterview();
    }else if(id === 'all-filter-btn'){
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
    }else if(id === 'reject-filter-btn'){
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderReject();
    }
    // calculate
    const totalJobs = document.querySelectorAll('#allCards .card').length;

    if(currentStatus === 'all-filter-btn'){
        jobStatusText.innerText = `${totalJobs} Jobs`;
    }else if(currentStatus === 'interview-filter-btn'){
        jobStatusText.innerText = `${interviewList.length} of ${totalJobs} Jobs`;
    }else if(currentStatus === 'reject-filter-btn'){
        jobStatusText.innerText = `${rejectList.length} of ${totalJobs} Jobs`;
    }
    console.log("Calculate->",currentStatus);
    console.log(totalJobs,jobStatusText.innerText);
    
    calculateCount();
    
}


mainContainer.addEventListener('click',function(event){
    if(event.target.closest('.deleteBtn')){
        let card = event.target.closest('.card');
        const companyName = card.querySelector('.companyName').innerText;

        interviewList = interviewList.filter(item => item.companyName !== companyName);

        rejectList = rejectList.filter(item => item.companyName !== companyName);
        
        card.remove();
        
        // after remove rerender the html
        if (currentStatus == "interview-filter-btn") {
            renderInterview();
        }
        // after remove rerender the html
        if (currentStatus == 'reject-filter-btn') {
            renderReject()
        }
        calculateCount();
    }
    if(event.target.classList.contains('interview-btn')){
        const parentNode = event.target.parentNode.parentNode;
        
        const companyName = parentNode.querySelector('.companyName').innerText;
        const position = parentNode.querySelector('.position').innerText;
        const location = parentNode.querySelector('.location').innerText;
        const type = parentNode.querySelector('.type').innerText;
        const salary = parentNode.querySelector('.salary').innerText;
        const status = parentNode.querySelector('.Status').innerText;
        const description = parentNode.querySelector('.description').innerText;

        const status1 = parentNode.querySelector('.Status')
        status1.innerText = 'INTERVIEW';
        status1.classList.add('btn', 'btn-outline', 'btn-success','bg-green-200/30','text-green-500')

        const cardInfo = {
            companyName,
            position,
            location,
            type,
            salary,
            status : 'INTERVIEW',
            description
        };

        const companyNameExist = interviewList.find(item => item.companyName == cardInfo.companyName);
        
        if(!companyNameExist){
            interviewList.push(cardInfo);
        }

        rejectList = rejectList.filter(item => item.companyName != cardInfo.companyName);
        // after remove rerender the html
        if (currentStatus == 'reject-filter-btn') {
            renderReject()
        }

         calculateCount()

    }else if(event.target.classList.contains('rejected-btn')){
        const parentNode = event.target.parentNode.parentNode;
        
        const companyName = parentNode.querySelector('.companyName').innerText;
        const position = parentNode.querySelector('.position').innerText;
        const location = parentNode.querySelector('.location').innerText;
        const type = parentNode.querySelector('.type').innerText;
        const salary = parentNode.querySelector('.salary').innerText;
        const status = parentNode.querySelector('.Status').innerText;
        const description = parentNode.querySelector('.description').innerText;

        const status2 = parentNode.querySelector('.Status')
        status2.innerText = 'REJECTED';
        status2.classList.add('btn', 'btn-outline', 'btn-error','bg-red-200/30','text-red-500')


        const cardInfo = {
            companyName,
            position,
            location,
            type,
            salary,
            status : 'REJECTED',
            description
        };

        const companyNameExist = rejectList.find(item => item.companyName == cardInfo.companyName);
        
        if(!companyNameExist){
            rejectList.push(cardInfo);
        }

        interviewList = interviewList.filter(item => item.companyName != cardInfo.companyName);

        // after remove rerender the html
        if (currentStatus == "interview-filter-btn") {
            renderInterview();
        }
        calculateCount();
    }
    
    
    // console.log(event.target.classList.contains('interview-btn'));
    // console.log(event.target.classList.contains('rejected-btn'));
    // console.log(event.target.parentNode.parentNode);
})

function renderInterview(){
    filterSection.innerHTML = '';
    if(interviewList.length == 0){
        const div = document.createElement('div');
        div.className = "w-full mx-auto bg-[#FFFFFF] shadow-lg shadow-[#F1F2F4] flex flex-col items-center justify-center px-5 py-28 mt-4 text-center space-y-4"
        div.innerHTML = `
            <div class="space-y-4">
                <p class="text-9xl text-[#7DA8FF]"><i class="fa-solid fa-file-lines"></i></p>
                <div class="flex flex-col space-y-2">
                    <h3 class="text-2xl font-semibold text-[#002C5C]">No jobs available</h3>
                    <p class="text-[#64748B]">Check back soon for new job opportunities</p>
                </div>
            </div>
        `
        filterSection.appendChild(div);
    }
    
    for(let interview of interviewList){
        let div = document.createElement('div');
        div.className = 'card flex flex-row justify-between md:items-start items-center w-full p-8 bg-[#FFFFFF] shadow-xl shadow-[#F1F2F4] mt-5 mb-4'
        div.innerHTML = `
            <!--Main part-1 -->
            <div class="space-y-4">
                <!--part - 1-->
                <div>
                    <h3 class="companyName text-xl font-semibold">${interview.companyName}</h3>
                    <p class="position text-[#64748B]">${interview.position}</p>
                </div>

                <!--part- 2 -->
                <div class="flex gap-2 items-center">
                    <p class="location text-[#64748B] text-sm">${interview.location}</p>
                    <span class="text-[#64748B]">•</span>
                    <p class="type text-[#64748B] text-sm">${interview.type}</p>
                    <span class="text-[#64748B]">•</span>
                    <p class="salary text-[#64748B] text-sm">${interview.salary}</p>
                </div>

                <!--part-3 -->
                <p class="Status btn btn-outline btn-success bg-green-200/30 text-green-500">${interview.status}</p>
                <p class="description text-[#323B49]">
                    ${interview.description}
                </p>

                <div>
                    <button class="interview-btn btn btn-outline btn-success">INTERVIEW</button>
                    <button class="rejected-btn btn btn-outline btn-error">REJECTED</button>
                </div>
            </div>

            <!--Main part-2 -->
            <div>
                <p class='deleteBtn bg-white shadow-xl shadow-gray-400 px-2 py-1.5 rounded-full text-[#64748B] cursor-pointer hover:text-red-500'>
                    <i class="fa-solid fa-trash-can"></i>
                </p>
            </div>
        `
        filterSection.appendChild(div);
    }
}
function renderReject(){
    filterSection.innerHTML = '';
    if(rejectList.length == 0){
        const div = document.createElement('div');
        div.className = "w-full mx-auto bg-[#FFFFFF] shadow-lg shadow-[#F1F2F4] flex flex-col items-center justify-center px-5 py-28 mt-4 text-center"
        div.innerHTML = `
            <div class="space-y-4">
                <p class="text-9xl text-[#7DA8FF]"><i class="fa-solid fa-file-lines"></i></p>
                <div class="flex flex-col space-y-2">
                    <h3 class="text-2xl font-semibold text-[#002C5C]">No jobs available</h3>
                    <p class="text-[#64748B]">Check back soon for new job opportunities</p>
                </div>
            </div>
        `
        filterSection.appendChild(div);
    }
    
    for(let reject of rejectList){
        console.log(reject);
        let div = document.createElement('div');
        div.className = 'card flex flex-row justify-between md:items-start items-center w-full p-8 bg-[#FFFFFF] shadow-xl shadow-[#F1F2F4] mt-5 mb-4'
        div.innerHTML = `
            <!--Main part-1 -->
            <div class="space-y-4">
                <!--part - 1-->
                <div>
                    <h3 class="companyName text-xl font-semibold">${reject.companyName}</h3>
                    <p class="position text-[#64748B]">${reject.position}</p>
                </div>

                <!--part- 2 -->
                <div class="flex gap-2 items-center">
                    <p class="location text-[#64748B] text-sm">${reject.location}</p>
                    <span class="text-[#64748B]">•</span>
                    <p class="type text-[#64748B] text-sm">${reject.type}</p>
                    <span class="text-[#64748B]">•</span>
                    <p class="salary text-[#64748B] text-sm">${reject.salary}</p>
                </div>

                <!--part-3 -->
                <p class="Status btn btn-outline btn-error bg-red-200/30 text-red-500">${reject.status}</p>
                <p class="description text-[#323B49]">
                    ${reject.description}
                </p>

                <div>
                    <button class="interview-btn btn btn-outline btn-success">INTERVIEW</button>
                    <button class="rejected-btn btn btn-outline btn-error">REJECTED</button>
                </div>
            </div>

            <!--Main part-2 -->
            <div>
                <p class='deleteBtn bg-white shadow-xl shadow-gray-400 px-2 py-1.5 rounded-full text-[#64748B] cursor-pointer hover:text-red-500'>
                    <i class="fa-solid fa-trash-can"></i>
                </p>
            </div>
        `
        filterSection.appendChild(div);
    }
}