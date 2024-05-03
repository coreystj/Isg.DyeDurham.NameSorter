/*
 * Summary: Tests the NameSorterEngineFactory class.
 * 
 * Date: 2024-05-02
 * Author: Corey St-Jacques
 * 
 */
using Isg.DyeDurham.NameSorter.Lib.Exceptions;
using Isg.DyeDurham.NameSorter.Lib.Factories;
using Isg.DyeDurham.NameSorter.Tests.Utils;

namespace Isg.DyeDurham.NameSorter.Tests.Engines
{
    [TestClass]
    public class NameSorterEngineFactoryTests
    {
        [TestMethod]
        public void Test_ReadingFromFile_NoneExistentFile_With_FileNotFoundException()
        {
            // Arrange
            string inputFilePath = ResourceUtils.GetFilePath(DataTypes.ResourceFileType.None);

            // Act
            try
            {
                var engine = NameSorterEngineFactory.CreateFromFile(inputFilePath);
            }
            catch (FileNotFoundException ex)
            {
                // Assertion of FileNotFoundException
            }
        }

        [TestMethod]
        public void Test_ReadingFromFile_EmptyPath_With_FileNotFoundException()
        {
            // Arrange
            string inputFilePath = string.Empty;

            // Act
            try
            {
                var engine = NameSorterEngineFactory.CreateFromFile(inputFilePath);
            }
            catch (FileNotFoundException ex)
            {
                // Assertion of FileNotFoundException
            }
        }


        [TestMethod]
        public void Test_ReadingFromFile_BinaryFile_With_InvalidContentException()
        {
            // Arrange
            string inputFilePath = ResourceUtils.GetFilePath(DataTypes.ResourceFileType.Sample_Invalid_Set_1);

            // Act
            try
            {
                var engine = NameSorterEngineFactory.CreateFromFile(inputFilePath);
            }
            catch (InvalidContentException ex)
            {
                // Assertion of InvalidContentException
            }
        }


        [TestMethod]
        public void Test_ReadingFromFile_Invalid_Set_2_With_InvalidContentException()
        {
            // Arrange
            string inputFilePath = ResourceUtils.GetFilePath(DataTypes.ResourceFileType.Sample_Invalid_Set_2);

            // Act
            try
            {
                var engine = NameSorterEngineFactory.CreateFromFile(inputFilePath);
            }
            catch (InvalidContentException ex)
            {
                // Assertion of InvalidContentException
            }
        }

        [TestMethod]
        public void Test_ReadingFromContent_EmptyFile_With_ContentsCannotBeNullOrEmptyExpcetion()
        {
            // Arrange
            string inputFilePath = ResourceUtils.GetFilePath(DataTypes.ResourceFileType.Sample_Empty_Set_1);

            // Act
            try
            {
                var engine = NameSorterEngineFactory.CreateFromFile(inputFilePath);
            }
            catch (ContentsCannotBeNullOrEmptyExpcetion ex)
            {
                // Assertion of ContentsCannotBeNullOrEmptyExpcetion
            }
        }


        [TestMethod]
        public void Test_ReadingFromContent_150Names_Set_1_With_InvalidContentException()
        {
            // Arrange
            string inputFilePath = ResourceUtils.GetFilePath(DataTypes.ResourceFileType.Sample_150_Named_Set_1);

            // Act
            try
            {
                var engine = NameSorterEngineFactory.CreateFromFile(inputFilePath);
            }
            catch (InvalidContentException ex)
            {
                // Assertion of InvalidContentException
            }
        }


        [TestMethod]
        public void Test_ReadingFromContent_150Names_Set_2_With_InvalidContentException()
        {
            // Arrange
            string inputFilePath = ResourceUtils.GetFilePath(DataTypes.ResourceFileType.Sample_150_Named_Set_2);

            // Act
            try
            {
                var engine = NameSorterEngineFactory.CreateFromFile(inputFilePath);
            }
            catch (InvalidContentException ex)
            {
                // Assertion of InvalidContentException
            }
        }
    }
}