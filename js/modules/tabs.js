
function tabs (tabSelector, tabHeaderSelector, tabItemSelector, activeClass) {
    let tab = document.querySelectorAll(tabSelector),
        tabHeader = document.querySelector(tabHeaderSelector),
        tabItem = document.querySelectorAll(tabItemSelector);



    function hideFirst (a) {
        for (let i = a; i < tab.length; i++) {
            tab[i].classList.remove('tabcontainer'); 
            tabItem[i].classList.remove(activeClass); 
            tab[i].classList.add('modal'); 
        }
    }
    hideFirst(1);

    function showTabs (b) {
        if (tab[b].classList.contains("modal")) { 
            tab[b].classList.remove('modal'); 
            tabItem[b].classList.add(activeClass); 
            tab[b].classList.add('tabcontainer'); 

        }
    }

    tabHeader.addEventListener("mouseover", function(event) {
        let target = event.target;
        if (target && target.classList.contains(tabItemSelector.slice(1))) { 
            for(let i = 0; i < tabItem.length; i++) {
                if (target == tabItem[i]) {
                    hideFirst(0); 
                    showTabs(i); 
                    break; 
                }
            }
        }

    });
}
export default tabs; 