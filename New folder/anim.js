// AllColors Object
function AllColors(colorArray){

    if(colorArray != null){
        this.colors = colorArray;
    } else{
        // Here are differnet ways to write colors
        this.colors = ["white", "#ff69b4", "lightgreen","darkgrey", "rgb(255,255,0)"]
    }

    this.GrabRandomColor = function(){
      return this.colors[Math.floor(Math.random() * this.colors.length)]
    }
    this.AddRandomColor = function(){
    //   * 255 because the random function is between 0 and 1 but the color scale goes between 0 and 255
      let red = Math.floor(Math.random() * 225)
      let green = Math.floor(Math.random() * 255)
      let blue = Math.floor(Math.random() * 255)
      let randomColor = "rgb("+ red +","+ green +"," + blue + ")"
      this.colors.push(randomColor)
    }
}

  // Table is our HTML Table Object, we can fill it, clear it, resize it and display it
  function Table(inputX, inputY){
    this.x = inputX
    this.y = inputY
    this.tableArray = []
    this.table
    
    // FillTableInOrder method takes an AllColors object and 
    // fills each of the tables cells with colours in order 
    // they appear in the AllColors.colors array, then repeats
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
  
    // RefreshTable removes the table from the HTML
    this.RefreshTable = function(){
      this.table.remove()
      this.DisplayTable()
    }

    this.FillCell = function(row, column, color){
      this.tableArray[column][row] = color
    }
  }

  
  // Declare our objects
  let myColors = new AllColors(["olive", "seagreen", "khaki", "goldenrod"])
  let myTable = new Table(8,4)
  myTable.FillTableInOrder(myColors)
  myTable.FillCell(2,2,"orange")
  myTable.FillCell(2,3,"darkseagreen")
  myTable.DisplayTable()


  function RandomiseTableAndDisplay(){
    myColors.AddRandomColor()
    myTable.FillCell(Math.floor(Math.random() * 8), Math.floor(Math.random() * 4), myColors.GrabRandomColor())
    myTable.RefreshTable()
  }

  
  setInterval("RandomiseTableAndDisplay()", 100)

  
  