/*
 * Summary: Tests the NameSorterEngine class.
 * 
 * Date: 2024-05-02
 * Author: Corey St-Jacques
 * 
 */

using Isg.DyeDurham.NameSorter.Lib.Factories;
using Isg.DyeDurham.NameSorter.Lib.Models;
using Isg.DyeDurham.NameSorter.Lib.Utils;
using Isg.DyeDurham.NameSorter.Tests.Utils;

namespace Isg.DyeDurham.NameSorter.Tests.Engines
{
    [TestClass]
    public class NameSorterEngineTests
    {
        [TestMethod]
        public void Test_ReadingFromContent_StandardSet1_With_ExpectedSet1()
        {
            // Arrange
            string rawInputFileContent = ResourceUtils.Read(DataTypes.ResourceFileType.Sample_STD_Set_1);
            string rawExpectedFileContent = ResourceUtils.Read(DataTypes.ResourceFileType.Sample_STD_Set_1_Expected_Result);
            var engine = NameSorterEngineFactory.CreateFromRaw(rawInputFileContent);

            FileContentUtils.TryReadLines(rawExpectedFileContent, out string[] expectedLines, out Exception? reason);
            var expectedResult = new NameSorterResult(expectedLines);

            // Act
            NameSorterResult sortResult = engine.Sort();

            // Assert
            Assert.AreEqual(sortResult, expectedResult);
        }

        [TestMethod]
        public void Test_ReadingFromFile_StandardSet1_With_ExpectedSet1()
        {
            // Arrange
            string inputFilePath = ResourceUtils.GetFilePath(DataTypes.ResourceFileType.Sample_STD_Set_1);
            string rawExpectedFileContent = ResourceUtils.Read(DataTypes.ResourceFileType.Sample_STD_Set_1_Expected_Result);
            var engine = NameSorterEngineFactory.CreateFromFile(inputFilePath);

            FileContentUtils.TryReadLines(rawExpectedFileContent, out string[] expectedLines, out Exception? reason);
            var expectedResult = new NameSorterResult(expectedLines);

            // Act
            NameSorterResult sortResult = engine.Sort();

            // Assert
            Assert.AreEqual(sortResult, expectedResult);
        }
    }
}