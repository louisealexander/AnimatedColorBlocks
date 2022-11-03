
// AllColors Object
// 
function AllColors(){

    // Here are differnet ways to write colors
    this.colors = ["white", "pink", "lightgreen","darkgrey", "rgb(255,255,0)"]
    
    // GetRandomColorElement Method returns a random color
    this.GetRandomColorElement = function(){
      let randomIndex = Math.floor(Math.random() * this.colors.length)
      return this.colors[randomIndex]
    }
  
    // AddColor Method lets us push another color into the this.colors array
    this.AddColor = function(inputColor){
      this.colors.push(inputColor)
    }

    this.RemoveColor = function(){
        this.colors.splice(0,1)
      }
  
    // ClearColors clears the this.colors array
    this.ClearColors = function(){
      this.colors = []
    }
  
    // Adds a random color to the array
    this.AddRandomColor = function(){
      let randomColor = "rgb("+ Math.random()* 255 +","+ Math.random()* 255  +"," + Math.random() * 255 + ")"
      this.colors.push(randomColor)
    }
  }
    // Table is our HTML Table Object, we can fill it, clear it, resize it and display it
  function Table(inputX, inputY){
    this.x = inputX
    this.y = inputY
    this.tableArray = []
    this.table
  
    // FillTableAtRandom method takes an AllColors object and fills each cell with a random choice of colors from the AllColors object
    this.FillTableAtRandom = function(allColor) { 
      for(let i = 0; i < this.y; i++){
        this.tableArray.push([])
        for(let j = 0; j < this.x; j++){
          this.tableArray[i].push(allColor.GetRandomColorElement())
        }
      }
    }
  
    // FillTableInOrder method takes an AllColors object and 
    // fills each of the tables cells with colours in order 
    // they appear in the AllColors.colors array
    this.FillTableInOrder = function(allColor){
      let count = 0
      for(let i = 0; i < this.y; i++){
        this.tableArray.push([])
        for(let j = 0; j < this.x; j++){
          count++
          count = count % allColor.colors.length // % give us a remainder
          this.tableArray[i].push(allColor.colors[count])
        }
      }
    }
  
    // DisplayTable method interfaces with the HTML of the site and displays the table
    // Don't worry about its workings
    this.DisplayTable = function() {
      this.table = document.createElement("table", "border = 1")
      this.table.style.border = "1px solid #000"
      var tableBody = document.createElement('tbody')
      var context = this   // Jamie's fix
      this.tableArray.forEach(function(rowData) {
        var row = document.createElement('tr')
  
        rowData.forEach(function(cellData) {
          var cell = document.createElement('td')
          cell.style.background = cellData
          cell.width = window.innerWidth / context.x
          cell.height = window.innerHeight / context.y
          row.appendChild(cell)
                
          })
        tableBody.appendChild(row)
      })
  
      this.table.appendChild(tableBody)
      document.body.appendChild(this.table)
    }
  
    // RemoveTable removes the table from the HTML
    this.RemoveTable = function(){
      this.tableArray = []
      this.table.remove()
    }
    
    this.ModifyColumns = function(minAmount, maxAmount){
        this.x = Math.random() * (maxAmount - minAmount) + minAmount
    }
    
    this.ModifyRows = function(minAmount, maxAmount){
        this.y = Math.random() * (maxAmount - minAmount) + minAmount
    }
  }
  
  // Declare our objects
  let myColors = new AllColors()
  let myTable = new Table(8,2)
  
  let colCount = 1;
  myTable.DisplayTable()
  
  function RandomiseTableAndDisplay(table){
    myColors.RemoveColor()
    table.RemoveTable()
    table.ModifyColumns(colCount, colCount++)
    //table.ModifyRows(2,12)
    myColors.AddRandomColor()
    table.FillTableInOrder(myColors)
    table.DisplayTable()
  }

  
  setInterval("RandomiseTableAndDisplay(myTable)", 500)

  
  